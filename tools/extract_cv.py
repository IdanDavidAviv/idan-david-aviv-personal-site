# requires: python-docx, dateparser
# pip install python-docx dateparser

from docx import Document
import json, sys, re
from datetime import datetime
import dateparser

def parse_docx(path):
    doc = Document(path)
    text = []
    for p in doc.paragraphs:
        t = p.text.strip()
        if t:
            text.append(t)
    return text

def find_sections(lines):
    # very pragmatic: find lines that look like headers (caps or contain years)
    sections = {}
    cur = "main"
    sections[cur] = []
    for l in lines:
        if re.search(r'\b(Experience|Education|Technical skills|Experience|Experience)\b', l, re.I):
            cur = l
            sections[cur] = []
        else:
            sections[cur].append(l)
    return sections

def extract_dates(s):
    # find years
    years = re.findall(r'(\b20\d{2}\b)', s)
    return years

def rank_by_recency(sections):
    # produce tags strong/medium/light by found years
    entries = []
    for sec, lines in sections.items():
        block = "\n".join(lines)
        years = extract_dates(block)
        year_max = max([int(y) for y in years]) if years else None
        entries.append({"section": sec, "text": block, "year": year_max})
    # sort by year desc
    entries_sorted = sorted(entries, key=lambda x: x['year'] if x['year'] else 0, reverse=True)
    # assign ranks
    for e in entries_sorted:
        if e['year'] and e['year'] >= 2023:
            e['rank'] = 'strong'
        elif e['year'] and e['year'] >= 2019:
            e['rank'] = 'medium'
        else:
            e['rank'] = 'light'
    return entries_sorted

if __name__ == "__main__":
    in_path = sys.argv[1]
    out_path = sys.argv[2]
    lines = parse_docx(in_path)
    sections = find_sections(lines)
    ranked = rank_by_recency(sections)
    summary = " ".join(lines[:8])
    out = {"summary": summary, "ranked": ranked, "raw_lines": lines}
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print("wrote", out_path)

