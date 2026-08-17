import os
import glob
import re

dir_path = r'c:\Users\Shalani A\Documents\Shalan\Client Projects(August)\Blood Test & Health Checkup Lab\pages'
for filepath in glob.glob(os.path.join(dir_path, '*.html')):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'rel="icon"' not in content:
        content = re.sub(r'(<title>.*?</title>)', r'\1\n  <link rel="icon" href="../assets/images/favicon.svg" type="image/svg+xml">', content, flags=re.IGNORECASE)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
print('Favicon injected successfully.')
