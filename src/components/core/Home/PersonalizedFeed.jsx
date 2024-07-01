import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Vortex } from 'react-loader-spinner';
import Posts from './Posts';
import { useAxiosWithAuth } from '../../../hooks/useAxios';

const PersonalizedFeed = () => {
    const [posts, setPosts] = useState([]);
    const [pageNum, setPageNum] = useState(2)
    const [hasMore, setHasMore] = useState(true)
    const axiosPrivate = useAxiosWithAuth()

    const fetchPersonalizedFeed = async (page, limit = 3) => {
        try {
            const { data } = await axiosPrivate.get(`/post/getPersonalizedFeed?page=${page}&limit=${limit}`)
            setPosts(prev => [...prev, ...data.data.personalizedPosts]);
            console.log(data.data);
            setHasMore(data.data.hasMore);
        } catch (error) {
            setPosts([]);
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPersonalizedFeed(pageNum);
    }, []);

    const Loader = () => <Vortex
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

    return (
        <InfiniteScroll
            dataLength={posts.length}
            hasMore={hasMore}
            next={() => {
                const nextPage = pageNum + 1
                fetchPersonalizedFeed(nextPage, 3);
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
            loader={<Loader />}
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