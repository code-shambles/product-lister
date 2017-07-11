## Lister (Concept)

### Central Tasks
- Communicate with server
- Maintain filter options
- Provide filter and product data for _Filter_ and _Display Elements_

#### Communicate With Server
- build the query from active filter options
- request product lists
- refine server results (if necessary)

#### Maintain Filter Options
- setup initial filter configuration
  - from `window.localStorage`
  - from `window.location.search` (URL Parameters)
  - from JSON in a `<script>`-tag delivered in an initial page load
- adopt to filter changes
  - CustomEvent `product-filter-changed` with filter data that changed
  - triggered by a _Filter Element_ (usually)

#### Provide Filter And Product Data For _Filter_ And _Display Elements_
- contains the product list
- contains the meta data
  - sorting and paging
  - filters applied
  - remaining available filters (later)
