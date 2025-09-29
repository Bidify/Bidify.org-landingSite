# Bidify - Landing Site

A modern landing page for Bidify, built with React and powered by a robust tech stack for optimal performance and user experience.

## Tech Stack

### Core Technologies
- **React**: ^17.0.2 - A JavaScript library for building user interfaces with component-based architecture
- **React DOM**: ^17.0.2 - DOM rendering library for React applications
- **React Router**: ^5.3.0 - Declarative routing for React applications enabling navigation between different views
- **Create React App**: ^4.0.3 - The standard toolchain for building React applications

### Styling & UI
- **Sass**: ^1.42.0 - CSS preprocessor with advanced features like variables, mixins, and nested rules
- **SCSS**: ^0.2.4 - SCSS syntax support for Sass
- **React Slick**: ^0.28.1 - Carousel component for React with touch support and responsive design
- **Slick Carousel**: ^1.8.1 - The underlying carousel library

### Utilities & Services
- **EmailJS**: ^3.2.0 - JavaScript library for sending emails from client-side applications
- **React Mailchimp Subscribe**: ^2.1.3 - Mailchimp integration for newsletter subscriptions
- **React Player**: ^2.9.0 - Universal video and audio player for React

### Development & Testing
- **Testing Library**: 
  - @testing-library/jest-dom: ^5.14.1 - Custom Jest matchers for testing React components
  - @testing-library/react: ^11.2.7 - React testing utilities
  - @testing-library/user-event: ^12.8.3 - Simulating user interactions in tests
- **Web Vitals**: ^1.1.2 - Measurement of core web vitals for performance monitoring

## Project Structure

```
src/
├── assets/           # Static assets (images, fonts, icons)
├── components/       # Reusable React components
├── data/            # Data files and configurations
├── pages/           # Page components
├── patterns/        # Pattern components
└── styles/          # SCSS stylesheets organized by component
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Features

- **Responsive Design**: Mobile-first approach with Sass for styling
- **Component Architecture**: Modular React components for maintainability
- **Interactive Elements**: Carousel components using React Slick
- **Email Integration**: EmailJS for contact forms and notifications
- **Newsletter Subscription**: Mailchimp integration for user engagement
- **Performance Optimized**: Built with Create React App for optimal performance

## Browser Support

The application is optimized to run on the following browsers:

- **Production**: >0.2%, not dead, not op_mini all
- **Development**: Last 1 version of Chrome, Firefox, and Safari

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Additional Resources

- [Sass Documentation](https://sass-lang.com/documentation)
- [React Router Documentation](https://reactrouter.com/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [React Slick Documentation](https://react-slick.neostack.com/)
