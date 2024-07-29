import { Modal, ModalBody, ModalContent, Spinner, useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import IconResults from './IconResults';
import ProjectResults from './ProjectResults';
import IconDetail from '../../icons/components/sub-icon-component/IconsDetailModal';
import getGlobalData from '../utilities/services/globalSearch.service';
import { toggleIconsDetailModal } from '../../../core/store/slice';
import { addCurrentIconDetails } from '../../../core/store/iconListData';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('q');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    //** Toggle Icon Detail Modal */
    const closeIconDetailModal = () => {
        onClose();
        setTimeout(() => {
            dispatch(addCurrentIconDetails(null));
            dispatch(toggleIconsDetailModal());
        }, 400);
    };

    useEffect(() => {
        const fetchSearchresults = async () => {
            setLoading(true);
            try {
                const search = String(searchQuery);
                const response = await getGlobalData(0, 100, search, 'createdDate');
                setSearchResults(response.data?.result);
            } catch (error) {
                console.error('error :', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchSearchresults();
    }, [location]);

    if (loading) {
        return <div className='flex justify-center absolute top-0 bottom-0 left-0 right-0 z-[1]'><Spinner /></div>;
    }

    return (
        <div>
            <main className='grid gap-5 mt-5'>
                {/* Start : Project Search Results */}
                <section>
                    <span
                        className='text-default-500 dark:text-default-800 font-medium'
                    >
                        Projects containing &apos;{searchQuery}&apos;
                    </span>
                    <div className="my-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 pt-2">
                        <ProjectResults searchResults={searchResults} />
                    </div>
                </section>
                {/* End : Project Search Results */}
                {/* Start : Icon Detail Modal */}
                <Modal
                    backdrop='blur'
                    size='5xl'
                    isOpen={isOpen}
                    onClose={closeIconDetailModal}
                    classNames={{ closeButton: 'hidden' }}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalBody>
                                    <IconDetail onClose={onClose}></IconDetail>
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                {/* End : Icon Detail Modal */}
                {/* Start : Icon Search Results */}
                <section>
                    <span className='text-default-500 dark:text-default-800 font-medium'>Icons</span>
                    <div className="flex gap-5 flex-wrap pt-2">
                        <IconResults
                            searchResults={searchResults}
                            onOpen={onOpen}
                        />
                    </div>
                </section>
                {/* End : Icon Search Results */}
            </main>
        </div>
    );
};

export default Dashboard;