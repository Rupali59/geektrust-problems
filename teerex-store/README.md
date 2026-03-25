# Teerex Store

**Official challenge:** [Teerex Store on Geektrust](https://www.geektrust.com/candidates/coding/detailed/teerex-store)

**Canonical spec (Geektrust):** [`../data/geektrust/problems/teerex-store.json`](../data/geektrust/problems/teerex-store.json).

**Geektrust catalog:** Problem code **`UI-PS3-1`** · slug `teerex-store`.


## Dev server

`npm install` then `npm run dev` (Vite + React).

## Build

`npm run build` — output in `dist/`.

## Requirements (from bundle)

- King Shan wants to start a t-shirt business, where he sells t-shirts online.
- Your job is to build a simple UI, which allows a customer to do the following:
- Every t-shirt type has a limited quantity. If the customer tries to order more than the available quantity, an error message should appear.
- Filter can be applied by itself or on top of the search results.
- Filters and Search need not be retained on navigation between pages, But the items in the cart should be retained.
- The mockup provided is only a sample so that you have an indication of what is expected from you. You could choose to go with a completely different user experience. But you will need to ensure that all requirements mentioned in the problem are covered & there should be navigation between screens.
- All features (search, filter, add to cart etc) should be handled on the client side.
- There are no API's provided for these features.
- There is no need to handle pagination.
- There is no need to implement user registration / login.
- Search box placeholder text should start with Search.
- Search icon/button should have class as search-button-container OR trigger search on ENTER.
- Search if triggered by button should have button text as Search.
- Filter labels should be given and match exactly.
- Cart Page should be navigable by /cart.
- Cart link should be an anchor tag.
- Cart page should also have images being displayed along with item details.
- Avoid using libraries like material UI and bootstrap for basic html components like buttons, checkboxes, textbox etc.
- We execute your application and run it on a specific port. This helps us in running automated tests against the UI you have developed. Hence please do not force the application to run on any specific ports in your configuration/package manager file. Please ensure that you are not overriding the PORT environment variable in your configuration/package manager file.
- On executing, your application should be running successfully on http://<hostname>:<port>. For e.g if the hostname of your local system is dev.local and the port you are running is 3030, then your application should be accessible at http://dev.local:3030/ and not just at http://localhost:3030/.
- Image: https://geektrust.sgp1.cdn.digitaloceanspaces.com/assets/v2/problems/teerex-store/product-listing.png
- Image: https://geektrust.sgp1.cdn.digitaloceanspaces.com/assets/v2/problems/teerex-store/product-listing-responsive.png
- Image: https://geektrust.sgp1.cdn.digitaloceanspaces.com/assets/v2/problems/teerex-store/shopping-cart.png
- We provide you an Catalogue API to list all the products and their properties.

## Notes

Frontend challenges often include a PDF or downloadable assets on Geektrust. Use the official detailed page and linked files for mocks and API contracts.
