"""Which plumage variants each species needs.

Reads data/plumage_classes.csv - family defaults with species overrides.

    ~/anaconda3/python.exe quiz/pipeline/plumage.py
    ~/anaconda3/python.exe quiz/pipeline/plumage.py --list Accipitridae
"""

from __future__ import annotations

import argparse
import csv
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import common  # noqa: E402

CLASSES = common.DATA / "plumage_classes.csv"

# Must match VARIANT_FILTERS in the harvester and VARIANTS in
# src/lib/quiz/photos.ts. The order is the wire format's variant index, so
# appending is safe and reordering is not.
VARIANTS = ["any", "male", "female", "juvenile", "immature"]


class Plumage:
    """Per-species sex and age flags, resolved from family defaults."""

    def __init__(self, families: dict, species: dict) -> None:
        self.families = families
        self.species = species

    def flags(self, code: str, family: str) -> dict[str, bool]:
        """Species row wins; otherwise the family row; otherwise neither."""
        if code in self.species:
            return self.species[code]
        return self.families.get(family, {"sexes": False, "ages": False})

    def variants_for(self, code: str, family: str) -> list[str]:
        """The variants worth harvesting for this species.

        `any` is always first and is not a male-only search - it is simply the
        best-rated photographs of the species, whatever they show. The filtered
        variants are additions to it, never replacements, because age and sex
        tagging is optional on upload and sparse for most species.
        """
        flags = self.flags(code, family)
        out = ["any"]
        if flags["sexes"]:
            out += ["male", "female"]
        if flags["ages"]:
            out += ["juvenile", "immature"]
        return out


def load() -> Plumage:
    if not CLASSES.exists():
        print(f"  (no {CLASSES.name}; no species will get variants)")
        return Plumage({}, {})

    families: dict[str, dict[str, bool]] = {}
    species: dict[str, dict[str, bool]] = {}

    with CLASSES.open(encoding="utf-8", newline="") as fh:
        # The file carries a long comment header, which csv has no concept of.
        rows = (line for line in fh if not line.lstrip().startswith("#"))
        for row in csv.DictReader(rows):
            scope = (row.get("scope") or "").strip()
            key = (row.get("key") or "").strip()
            if not scope or not key:
                continue
            flags = {
                "sexes": (row.get("sexes") or "").strip().lower() == "yes",
                "ages": (row.get("ages") or "").strip().lower() == "yes",
            }
            if scope == "family":
                families[key] = flags
            elif scope == "species":
                species[key] = flags

    return Plumage(families, species)


def traits() -> dict[str, dict]:
    path = common.TAXONOMY_CSV
    if not path.exists():
        return {}
    with path.open(encoding="utf-8", newline="") as fh:
        return {r["species_code"]: r for r in csv.DictReader(fh)}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--list", metavar="FAMILY", help="show one family's species")
    args = parser.parse_args()

    plumage = load()
    rows = traits()
    if not rows:
        print("no taxonomy.csv - run export_web.py first")
        return 1

    print(f"{len(plumage.families)} family rules, {len(plumage.species)} species overrides")
    print()

    sexes = ages = both = neither = 0
    requests = 0
    for code, row in rows.items():
        flags = plumage.flags(code, row["family"])
        if flags["sexes"] and flags["ages"]:
            both += 1
        elif flags["sexes"]:
            sexes += 1
        elif flags["ages"]:
            ages += 1
        else:
            neither += 1
        requests += len(plumage.variants_for(code, row["family"]))

    print(f"  sexes only   {sexes:5}")
    print(f"  ages only    {ages:5}")
    print(f"  both         {both:5}")
    print(f"  neither      {neither:5}")
    print(f"  ---")
    print(f"  {len(rows)} species -> {requests} variant searches")
    print(f"  ({requests - len(rows)} more than a plain one-bank harvest)")

    if args.list:
        print()
        print(f"{args.list}:")
        for code, row in sorted(rows.items(), key=lambda kv: kv[1]["common_name"]):
            if row["family"] != args.list:
                continue
            variants = plumage.variants_for(code, row["family"])
            mark = " (override)" if code in plumage.species else ""
            print(f"  {code:10} {row['common_name']:34} {', '.join(variants)}{mark}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
