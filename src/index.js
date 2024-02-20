import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './redux/userSlice';
import spinnerSlice from './redux/spinnerSlice';
import previousUrlSlice from './redux/previousUrlSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const store = configureStore({
    reducer: {
        userSlice,
        spinnerSlice,
        previousUrlSlice,
    },
});

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
