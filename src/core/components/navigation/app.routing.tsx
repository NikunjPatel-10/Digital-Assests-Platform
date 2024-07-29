import { Outlet, createBrowserRouter } from 'react-router-dom';
import Home from '../../../pages/home/components/Home';
import Icons from '../../../pages/icons/components/Icons';
import Header from '../header/Header';
import Projects from '../../../pages/projects/components/Projects';
import Dashboard from '../../../pages/search/components/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import { DAPRoutes } from '../../utility/enum/core.enum';

const Layout = () => {
    return (
        <>
            {/* Start : App Header */}
            <Header />
            {/* End : App Header */}
            {/* Start : App Outlet */}
            <div className="container p-10 mx-auto">
                <Outlet />
            </div>
            {/* End : App Outlet */}
        </>
    );
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                index: true,
                element: <Home />
            },
            {
                path: DAPRoutes.PROJECTS,
                element: <Projects />,
            },
            {
                path: `${DAPRoutes.PROJECTS}/:projectid`,
                element: <Icons />,
            },

            {
                path: DAPRoutes.SEARCH,
                element: <Dashboard />,
            },
            {
                path: `${DAPRoutes.SEARCH}/:projectid`,
                element: <Icons />,
            },
        ]
    }
]);



export { Layout, router };