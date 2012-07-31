#!/usr/bin/python

# Copyright (C) 2012 Robert Kooima

# This is a static website generator. It expects to find a directory called
# 'input' containing files page.html and item.html giving HTML templates.
#
# The 'input' directory also contains a set of subdirectories of the form
# 00_ABC, each of which is converted to a PAGE accordingly named ABC.html.
#
# Each subdirectory contains a set of Markdown files of the form 00_XYZ.md, each
# of which is converted to an ITEM in the corresponding page with anchor name
# XYZ, annotated with image file XYZ.png or XYZ.jpg.
#
# Pages and items are processed in ASCII-betical order, so the 00_ prefix
# determines the order in which they appear.

import os
import re
import string
import subprocess

# Match a name against the expected pattern of an item. Return the parts.

def matchitem(name):
    mo = re.match('([0-9]+)_(.*)\.md', name)
    if mo:
        return (int(mo.group(1)), mo.group(2))
    else:
        return None

# Match a name against the expected pattern of a page. Return the parts.

def matchpage(name):
    mo = re.match('([0-9]+)_(.*)', name)
    if mo:
        return (int(mo.group(1)), mo.group(2))
    else:
        return None

# Scan the named directory for Markdown files. Each of these will be translated
# into an item. Return them in reverse order.

def getitems(dir):
    all = []
    for name in os.listdir(dir):
        if os.path.isfile(os.path.join(dir, name)):
            if matchitem(name):
                all.append(name)
    return sorted(all, reverse=True)

# Scan the named directory for subdirectories. Each of these will be translated
# into a page. Return them in sorted.

def getpages(dir):
    all = []
    for name in os.listdir(dir):
        if os.path.isdir(os.path.join(dir, name)):
            if matchpage(name):
                all.append(name)
    return sorted(all)

# Read the named Markdown file in the given directory. Translate it, giving the
# resulting item in HTML form.

def makeitem(root, page, item):
    path = os.path.join(root, page, item)

    # Process the Markdown.

    proc = subprocess.Popen(['./Markdown.pl', path], stdout=subprocess.PIPE)
    text = proc.stdout.read()

    # Determine the desired image name.

    name = matchitem(item)[1]

    png = os.path.join('images', name + '.png')
    jpg = os.path.join('images', name + '.jpg')
    nil = os.path.join('images', 'missing.png')

    # Apply the template.

    html = string.Template(open(os.path.join(root, 'item.html')).read())

    if   os.path.isfile(png):
        return html.substitute(name=name, image=png, text=text)
    elif os.path.isfile(jpg):
        return html.substitute(name=name, image=jpg, text=text)
    else:
        return html.substitute(name=name, image=nil, text=text)

    return ''

# Enumerate all Markdown files in the given directory and accumulate the text
# of the items that they define. Write an HTML page with these contents.

def makepage(root, page):
    path = os.path.join(root, page)

    # Accumulate all items in this page.

    content = ''
    for item in getitems(path):
        content = content + makeitem(root, page, item)

    # Write the HTML file.

    html = string.Template(open(os.path.join(root, 'page.html')).read())
    name = matchpage(page)[1]

    f = open(name + '.html', 'w')
    if f:
        f.write(html.substitute(content=content))
        f.close()

# Generate the site by enumerating directories and files end applying the
# template to each.

def generate(root):

    # Generate each page in turn.

    for page in getpages(root):
        makepage(root, page)

generate('input')
