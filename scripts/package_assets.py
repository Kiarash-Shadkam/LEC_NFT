#!/usr/bin/env python3
import os
import glob
import zipfile

def package_all_assets():
    os.makedirs('public/downloads', exist_ok=True)
    zip_path = 'public/downloads/QEC_Master_Artworks_Pack.zip'

    # Dynamically find all images in public/images
    files_to_pack = []
    
    if os.path.exists('public/images/qec_logo.jpg'):
        files_to_pack.append(('public/images/qec_logo.jpg', '01_Visual_Identity/QEC_Collection_Logo_1024x1024.jpg'))
    if os.path.exists('public/images/qec_banner.jpg'):
        files_to_pack.append(('public/images/qec_banner.jpg', '01_Visual_Identity/QEC_Collection_Banner_1376x768.jpg'))
        
    for nft_file in sorted(glob.glob('public/images/qec_nft_*.jpg')):
        base = os.path.basename(nft_file)
        files_to_pack.append((nft_file, f'02_Artworks/{base}'))

    for meta_file in sorted(glob.glob('public/metadata/*.json')):
        base = os.path.basename(meta_file)
        files_to_pack.append((meta_file, f'03_Metadata_JSON/{base}'))

    readme_content = """=======================================================
QUANTUM ENGRAVING COLLECTION (QEC) — MASTER ARTWORKS PACK
=======================================================
Creator: Alireza Mahdipour Shadkam
Affiliation: Nanophotonics Group, Faculty of Electrical and Computer Engineering, University of Tabriz
Thesis: Modeling and implementation of laser engraving considering the impact of layers material
Supervisors: Dr. Hamed Baghban, Dr. Hadi Veladi
Date: February 2026

INCLUDED ASSETS:
1. 01_Visual_Identity/
   - QEC_Collection_Logo_1024x1024.jpg (Square 1:1 Profile Avatar)
   - QEC_Collection_Banner_1376x768.jpg (Wide 16:9 Collection Header)

2. 02_Artworks/
   - High-resolution Master NFT Artworks (1/1 Single Editions)
   - Pure fine art without text, frames, borders, or watermarks.

3. 03_Metadata_JSON/
   - ERC-721 standard metadata for OpenSea / Polygon.
=======================================================
"""

    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as z:
        for src, dst in files_to_pack:
            if os.path.exists(src):
                z.write(src, dst)
        z.writestr('README_COLLECTION_INFO.txt', readme_content)

    size = os.path.getsize(zip_path)
    print(f"Master Archive updated at {zip_path}: {size} bytes ({len(files_to_pack)} files packed)")

if __name__ == '__main__':
    package_all_assets()
