"""
This script is a static site generator that processes markdown files with YAML front matter,
converts them to HTML, and renders them using Jinja2 templates. The generated HTML files are
saved in the output directory. Written mostly by Claude.

The script performs the following steps:
1. Ensures the output directory exists.
2. Sets up the Jinja2 environment and loads the templates.
3. Parses the front matter and markdown content from each markdown file.
4. Converts the markdown content to HTML.
5. Renders the HTML content using the Jinja2 templates.
6. Saves the rendered HTML files to the output directory.
7. Collects post information for further processing (e.g., generating an index page).

Configuration:
- content_dir: Directory containing the markdown files.
- output_dir: Directory where the generated HTML files will be saved.
- template_dir: Directory containing the Jinja2 templates.

Functions:
- parse_front_matter(content): Parses the YAML front matter and markdown content from a given string.

Dependencies:
- os
- markdown
- jinja2
- yaml
- datetime
"""


import os
import markdown
import jinja2
import yaml
from datetime import datetime
from markdown.extensions.tables import TableExtension
from markdown.extensions.codehilite import CodeHiliteExtension
from markdown.extensions.fenced_code import FencedCodeExtension

# Configuration
content_dir = 'posts'
blog_index_dir = 'blog'
template_dir = 'templates'


# Set up Jinja2 environment
env = jinja2.Environment(loader=jinja2.FileSystemLoader(template_dir))
post_template = env.get_template('post.html')
index_template = env.get_template('index.html')


def parse_front_matter(content):
    parts = content.split('---', 2)
    if len(parts) == 3:
        front_matter = yaml.safe_load(parts[1])
        markdown_content = parts[2]
    else:
        front_matter = {}
        markdown_content = content
    return front_matter, markdown_content


# Process markdown files
posts = []
for filename in os.listdir(content_dir):
    if filename.endswith('.md'):
        with open(os.path.join(content_dir, filename), 'r') as f:
            content = f.read()

        front_matter, markdown_content = parse_front_matter(content)

        md = markdown.Markdown(extensions=[
            TableExtension(),
            CodeHiliteExtension(css_class='highlight'),
            FencedCodeExtension()
        ])

        html = md.convert(markdown_content)
        title = front_matter['title']
        date = front_matter['date']
        url_path = front_matter['path']

        try:
            # If parsing succeeds, format the date back to string
            date = date.strftime('%Y-%m-%d')
        except ValueError:
            raise ValueError(f"Invalid date format for '{title}'")
            
        year, month, day = date.split('-')
        
        # Create the directory structure
        output_dir = os.path.join(year, month, day, url_path)
        os.makedirs(output_dir, exist_ok=True)

        print(filename, year, month, day)    
        output_path = os.path.join(output_dir, 'index.html')
        with open(output_path, 'w') as f:
            f.write(post_template.render(content=html, title=title))

        post_info = {
            'title': title,
            'url': os.path.join('/', output_dir),
            'date': 'yo',
            'summary': front_matter['summary'],
            # **front_matter
        }
        posts.append(post_info)


# Sort posts by date, newest first
posts.sort(key=lambda x: x['date'], reverse=True)

# Generate home page
with open(os.path.join('index.html'), 'w') as f:
    f.write(index_template.render(posts=posts))

# Generate blog index page
blog_template = env.get_template('blog.html')
os.makedirs(blog_index_dir, exist_ok=True)  # Ensure blog directory exists
with open(os.path.join(blog_index_dir, 'index.html'), 'w') as f:
    f.write(blog_template.render(posts=posts))
