---
# Leave the homepage title empty to use the site title
title: ""
date: 2022-10-24
type: landing

design:
  # Default section spacing
  spacing: "6rem"

sections:
  - block: resume-biography-3
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
      text: ""
      # Show a call-to-action button under your biography? (optional)
      button:
        text: Download CV
        url: uploads/resume.pdf
    design:
      css_class: dark
      background:
        color: black
        image:
          # Add your image background to `assets/media/`.
          filename: anton-maksimov-5642-su-sXnp2OfhghE-unsplash.jpg
          filters:
            brightness: 0.4
          size: cover
          position: center
          parallax: true
  - block: markdown
    demo: true # Only display this section in the Hugo Blox Builder demo site
    content:
      title: '📚 My Research'
      subtitle: ''
      text: |-
        Use this area to speak to your mission. I'm a research scientist in the Moonshot team at DeepMind. I blog about machine learning, deep learning, and moonshots.

        I apply a range of qualitative and quantitative methods to comprehensively investigate the role of science and technology in the economy.
        
        Please reach out to collaborate 😃
    design:
      columns: '1'
  - block: collection # Featured publications
    demo: true # Only display this section in the Hugo Blox Builder demo site
    id: papers
    content:
      title: Featured Publications
      filters:
        folders:
          - publication
        featured_only: true
    design:
      view: article-grid
      columns: 2
  - block: collection
    demo: true # Only display this section in the Hugo Blox Builder demo site
    content:
      title: Recent Publications
      text: ""
      filters:
        folders:
          - publication
        exclude_featured: false
    design:
      view: citation
  - block: collection
    demo: true # Only display this section in the Hugo Blox Builder demo site
    id: talks
    content:
      title: Recent & Upcoming Talks
      filters:
        folders:
          - event
    design:
      view: article-grid
      columns: 1
  - block: collection
    demo: false # Only display this section in the Hugo Blox Builder demo site
    id: blog
    content:
      title: Blog posts
      filters:
        folders:
          - post
    design:
      view: date-title-summary # Available layouts
      columns: 1
  - block: collection
    id: news
    demo: true
    content:
      title: Recent News
      subtitle: ''
      text: ''
      # Page type to display. E.g. post, talk, publication...
      # page_type: project
      # Choose how many pages you would like to display (0 = all pages)
      count: 5
      # Filter on criteria
      filters:
        author: ""
        category: ""
        tag: ""
        exclude_featured: false
        exclude_future: false
        exclude_past: false
        publication_type: ""
      # Choose how many pages you would like to offset by
      offset: 0
      # Page order: descending (desc) or ascending (asc) date.
      order: desc
    design:
      # Choose a layout view
      view: date-title-summary
      # Reduce spacing
      spacing:
        # Customize the section spacing. Order is top, right, bottom, left.
        padding: ['20px', 0, 0, 0]
  - block: cta-card
    demo: false
    content:
      title: Let’s work together
      text: |-
        If you’re hiring or need help with software engineering / DevOps, email me with what you’re building and what success looks like.
      button:
        text: Email me
        url: mailto:lbonanni.pro@gmail.com
    design:
      card:
        # Card background color (CSS class)
        css_class: "bg-primary-700"
        css_style: ""
---
