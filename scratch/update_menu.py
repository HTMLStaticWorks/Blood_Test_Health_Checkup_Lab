import glob
import re
import os

html_files = glob.glob('pages/*.html')

# We use a non-greedy regex to match the exact block across multiple lines if needed
target_pattern = r'<a href="#homeSubmenu" data-bs-toggle="collapse"[\s\S]*?Home <i class="bi bi-chevron-down fs-6 text-muted"></i>\s*</a>'

replacement = '''<div class="d-flex align-items-center justify-content-between w-100">
          <a href="index.html" class="text-decoration-none flex-grow-1" style="padding: 0.75rem 0; color: inherit;">Home</a>
          <a href="#homeSubmenu" data-bs-toggle="collapse" class="text-decoration-none px-3 py-2" style="color: inherit;">
            <i class="bi bi-chevron-down fs-6 text-muted"></i>
          </a>
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
