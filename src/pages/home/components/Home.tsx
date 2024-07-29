import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import Search from '../../../shared/common-ui/search-input/Search';
import { HomePageText } from '../utility/constants/home.constant';
const Home = () => {
    return (
        <div className="flex flex-col justify-center gap-4 flex-wrap mt-5 max-w-7xl">
            {/* Start : Hero Section */}
            <section className="lg:basis-6/12 flex-1">
                <h1 className="md:text-6xl text-4xl font-bold">
                    {HomePageText.HERO_TEXT}
                </h1>
                <p className="mt-2">
                    {HomePageText.WELCOME_TEXT}
                </p>
            </section>
            {/* End : Hero Section */}
            {/* Start : Get Started */}
            <section className='flex justify-between mt-10'>
                {/* Start : Action Navigate to Projects */}
                <Link to="/projects" className='flex text-center'>
                    <button className="bg-purple-500 rounded px-4 text-xl hover:bg-purple-600">
                        {HomePageText.BTN_GET_STARTED}
                    </button>
                </Link>
                {/* End : Action Navigate to Projects */}
                {/* Start : Global Search */}
                <Suspense>
                    <Search />
                </Suspense>
                {/* End : Global Search */}
            </section>
            {/* End : Get Started */}
        </div>
    );
};

export default Home;