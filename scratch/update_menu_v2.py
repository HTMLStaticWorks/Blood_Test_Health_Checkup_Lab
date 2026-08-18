import glob
import re
import os

html_files = glob.glob('pages/*.html')

# We use regex to match the exact block we inserted previously
target_pattern = r'<div class="d-flex align-items-center justify-content-between w-100">\s*<a href="index\.html" class="text-decoration-none flex-grow-1" style="padding: 0\.75rem 0; color: inherit;">Home</a>\s*<a href="#homeSubmenu" data-bs-toggle="collapse" class="text-decoration-none px-3 py-2" style="color: inherit;">\s*<i class="bi bi-chevron-down fs-6 text-muted"></i>\s*</a>\s*</div>'

replacement = '''<div class="position-relative w-100">
          <a href="index.html" class="d-flex align-items-center text-decoration-none w-100" style="padding: 0.75rem 0; color: inherit;">Home</a>
          <span data-bs-toggle="collapse" data-bs-target="#homeSubmenu" class="position-absolute top-0 end-0 h-100 d-flex align-items-center justify-content-center" style="width: 40px; cursor: pointer; z-index: 10;">
            <i class="bi bi-chevron-down fs-6 text-muted"></i>
          </span>
        </div>'''

updated_count = 0
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content, count = re.subn(target_pattern, replacement, content)
    
    if count > 0:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
        updated_count += 1

print(f"Total files updated: {updated_count}")
