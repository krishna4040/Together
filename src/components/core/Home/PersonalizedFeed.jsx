import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Vortex } from 'react-loader-spinner';
import Posts from './Posts';

const PersonalizedFeed = () => {
    const [posts, setPosts] = useState([]);
    const { token } = useSelector(state => state.auth)
    const [pageNum, setPageNum] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const fetchPersonalizedFeed = async (page, limit = 3) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/post/getPersonalizedFeed?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPosts(prev => [...prev, ...data.data.personalizedPosts]);
            setHasMore(data.data.hasMore);
        } catch (error) {
            setPosts([]);
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPersonalizedFeed(pageNum);
    }, []);

    return (
        <InfiniteScroll
            dataLength={posts.length}
            hasMore={hasMore}
            next={() => {
                const nextPage = pageNum + 1
                fetchPersonalizedFeed(nextPage, 3, true);
                setPageNum(nextPage);
            }}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            }
            releaseToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            }
            loader={
                <Vortex
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="vortex-loading"
                    wrapperStyle={{
                        width: '100%',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    wrapperClass="vortex-wrapper"
                    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                />
            }
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>No More Posts Left!!</b>
                </p>
            }
            refreshFunction={() => {
                const nextPage = pageNum + 1
                fetchPersonalizedFeed(nextPage);
                setPageNum(nextPage);
            }}
        >
            <Posts posts={posts} setPosts={setPosts} />
        </InfiniteScroll>
    )
}

export default PersonalizedFeed