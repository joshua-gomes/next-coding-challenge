# Michael's NextJS Coding Challenge

## Candidate Notes:

### Mocking out data and keeping cart state

I was not sure if the intent of the test was to setup APIs to fetch product data and to maintain a cart. I kept the solution of managing the cart data in state and left a note on why I think having an api which we sync our state with would be better and help reduce business logic on the frontend.

Also, with the product data I just used a local mock to power the product feed. I mentioned that using something like [json-server](https://www.npmjs.com/package/json-server), might be something worth using to help quickly setup a server which can be powered by the mocks.

### Testing

Throughout the test I tried to write tests for every component I created. I enjoy writing a mixture of unit and integration tests, because I feel like they both offer value and provide extra layers for testing your application. If given more time I would also look at adding snapshot testing to the project to help ensure no visual regressions occur when changes are made in the future.

I also enjoy writing against test cases that are described in the gherkin format. They can be really helpful when trying to write tests that follow BDD. There is a really great library which can be used to help map these gherkin requirements to actual test cases. It is called [jest-cucumber](https://www.npmjs.com/package/jest-cucumber).

**Note:** I did struggle trying to spy on some the **useBasketContext** hook to help isolate my unit tests, but it just wasn't intercepting the call in the component. This is something I am usually able to do at work without an issue so I wonder if it might be something related to some different test configuration. I have decided to use skip those tests for now since they are covered by the page-level tests. If I had more time I would try figure out why I am having issues spying on that **useBasketContext** hook.

### Styling

With no design to reference it is hard to say if it is meant to look the way it currently looks. I tried my best to follow the original styling after using elements that are more semantic. I also noticed that the styles weren't done mobile first. If I had some extra time I would refactor the styles so they are mobile first and use breakpoint that utilise **min-width** so the styles progressively override the mobiles styles with larger viewports.

I also haven't styled using module.css files in a long time, so I am unaware of the current best practises to share common styles. I am used to using CSS-in-JS solutions like styled-components and vanilla-extract, which allow you to share styles quite easily by style rules as javascript variables and referencing them when needed.

### Accessibility

When writing the JSX for the code, I tried writing it in a way which felt more semantic and which could help user's using a screen-reader understand the content of the page.

I also noticed that we we're using aria-labels for the product cards. I think this is really great to have, but I did notice that the labels were the same for each product. This can be confusing for the person using a screen reader, because it would repeat that label for each button. I modified the aria label for each product card to include the product name in it. I think this will aid in identifying which 

## The Challenge:

Some newb has made a mess of this code. There are TODOs that need finishing off, broken and questionable tests and the code itself is inefficient.  
Please fix up whatever mess you find to get this piece of work working well.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, `npm install`, then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run the testing and linting with `npm run test` and `npm run lint`.
