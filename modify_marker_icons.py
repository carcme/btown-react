import re
import json

file_path = "src/components/map/CustomMarkerIcon.tsx"

with open(file_path, 'r') as f:
    content = f.read()

# Helper function to add title to SVG if it doesn't exist
def add_title_to_svg(svg_string, default_title, type_val=None):
    if 'title="' in svg_string:
        return svg_string

    # Use type_val if provided for more specific titles
    title = f"{type_val} location marker" if type_val else default_title
    
    # Replace the first '>' after '<svg' with ' title="..." >'
    return re.sub(r'<svg([^>]*)>', rf'<svg\1 title="{title}">', svg_string, 1)

# --- Modify createWikiMarkerIcon ---
# Find the svgTemplate assignment and add title
content = re.sub(
    r'(const svgTemplate = `(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24"\s*)(style="opacity:1;">)')
    r'(const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24" title="Wikipedia article location" style="opacity:1;">)`',
    content,
    1
)

# --- Modify createMarkerIcon ---
# Find the svgTemplate assignment and add title
content = re.sub(
    r'(const svgTemplate = `\s*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker"\s*)(>)',
    r'\1 title="General location marker"\2',
    content,
    1
)

# --- Modify createIqMarkerIcon ---
# This requires iterating through the switch cases more carefully.
# We'll find the entire createIqMarkerIcon function block first.
iq_marker_func_match = re.search(
    r'(export function createIqMarkerIcon\([^)]+\) {\s*.*?switch \(type\) {\s*)(.*?)(^\s*})',
    content,
    re.DOTALL | re.MULTILINE
)

if iq_marker_func_match:
    func_start = iq_marker_func_match.group(1)
    switch_body = iq_marker_func_match.group(2)
    func_end = iq_marker_func_match.group(3)

    # Process each case within the switch body
    
    # Regex to find each svgTemplate assignment within a case or default
    # It captures the case/default, the svgTemplate assignment, and the SVG string
    case_svg_pattern = re.compile(r'(case "([^"]+)":\s*svgTemplate = `)(<svg.*?)(`;\s*break;)', re.DOTALL)
    default_svg_pattern = re.compile(r'(default:\s*svgTemplate = `)(<svg.*?)(`;\s*break;)', re.DOTALL)

    def replace_case_svg(match):
        prefix = match.group(1)
        svg_string = match.group(3)
        suffix = match.group(4)
        type_val = match.group(2)
        
        updated_svg = add_title_to_svg(svg_string, "General location marker", type_val)
        return f"{prefix}{updated_svg}{suffix}"
    
    switch_body = case_svg_pattern.sub(replace_case_svg, switch_body)

    def replace_default_svg(match):
        prefix = match.group(1)
        svg_string = match.group(2)
        suffix = match.group(3)
        updated_svg = add_title_to_svg(svg_string, "General location marker")
        return f"{prefix}{updated_svg}{suffix}"

    switch_body = default_svg_pattern.sub(replace_default_svg, switch_body)


    # Reconstruct the function
    new_iq_marker_func = f"{func_start}{switch_body}{func_end}"
    content = content.replace(iq_marker_func_match.group(0), new_iq_marker_func)


with open(file_path, 'w') as f:
    f.write(content)

print(f"Successfully updated {file_path} with accessibility titles for marker icons.")