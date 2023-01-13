import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './components/Home';

function App() {

    return (
        <Routes>
            {/* Root of web app */}
            <Route path="/" element={<Layout />}>
                {/* page of web app */}
                <Route index element={<Home />} />
            </Route>
        </Routes>
    );
}

export default App;
