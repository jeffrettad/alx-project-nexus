# React Native E-Commerce App
This is a React Native e-commerce app designed to showcase product listings, allow users to add items to a shopping cart, and manage their orders. The app uses TypeScript, Redux, and Tailwind-like utility classes via NativeWind for styling.

## Features
- Product Catalog: Displays a list of products fetched from an API.
- Cart Management: Users can add products to their cart, view their cart, and remove items.
- Responsive UI: Utilizes NativeWind to apply Tailwind-like classes for styling the components.
- Order Processing: Allows users to proceed with an order or remove items from the cart.

## Tech Stack
- React Native: A framework for building mobile apps using JavaScript and React.
- TypeScript: A statically typed superset of JavaScript, providing better tooling and error checking.
- Redux: A state management library used to manage the cart state and actions.
- Axios: For making HTTP requests to fetch the product data.
- NativeWind: A utility-first CSS framework for React Native, allowing you to use Tailwind CSS-like classes in your React Native components.
- Expo: A toolset for building React Native applications.

## API Integration
-
## Key Components
1. HomeScreen.tsx
This screen fetches product data from an external API (https://fakestoreapi.com/products) and displays a list of products. Each product can be added to the shopping cart.

- Product Listing: Displays the product's title, image, and price.
- Add to Cart Button: Allows the user to add the product to their cart.
  
2. CartScreen.tsx
-  This screen displays the items added to the cart, with options to remove items and proceed to order.
- Cart Management: Allows users to increase or decrease item quantities, remove items, and proceed with the checkout.
  
3. Redux State (cartSlice.ts)
- The cartSlice.ts file defines the Redux slice that manages the state of the shopping cart. It contains actions to add, remove, increase quantity, decrease quantity, and clear the cart.

4. NativeWind (Styling)
- NativeWind is used to apply utility-first styling, similar to TailwindCSS, to React Native components. You can apply classes like bg-gray-200, p-4, text-xl directly in JSX, making the styling process faster and easier.
  
