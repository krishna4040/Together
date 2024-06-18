import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Vortex } from 'react-loader-spinner';
import Posts from './Posts';

const PersonalizedFeed = () => {
    const [posts, setPosts] = useState();
    const { token } = useSelector(state => state.auth)

    const fetchPersonalizedFeed = async (skip = 3, limit = 3) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/post/getPersonalizedFeed?skip=${skip}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPosts(data.data)
        } catch (error) {
            setPosts([]);
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPersonalizedFeed(0,3);
    }, []);

    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={fetchPersonalizedFeed}
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
                    wrapperStyle={{}}
                    wrapperClass="vortex-wrapper"
                    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                />
            }
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>No More Posts Left!!</b>
                </p>
            }
        >
            <Posts posts={posts} setPosts={setPosts} />
        </InfiniteScroll>
    )
}

export default PersonalizedFeed