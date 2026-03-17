import re, glob

emoji_re = re.compile(
    u'[\U00010000-\U0010ffff'
    u'\U00002600-\U000027BF'
    u'\U0000FE00-\U0000FE0F'
    u'\U00002300-\U000023FF'
    u'\u2702-\u27b0'
    u']+',
    flags=re.UNICODE
)

files = [
    '/home/runner/workspace/index.html',
    '/home/runner/workspace/casos.html',
    '/home/runner/workspace/como-trabajamos.html',
    '/home/runner/workspace/porque-elefante.html',
]
files += glob.glob('/home/runner/workspace/soluciones/*.html')

for path in files:
    with open(path, encoding='utf-8') as f:
        content = f.read()
    new_content = emoji_re.sub('', content)
    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print('Updated:', path)
    else:
        print('No change:', path)
print('Done.')
