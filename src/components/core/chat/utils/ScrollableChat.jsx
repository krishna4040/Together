import React from 'react'
import { useSelector } from 'react-redux'
import ScrollableFeed from 'react-scrollable-feed'

const ScrollableChat = ({ messages }) => {

    const user = useSelector(state => state.user);

    const isSameSender = (messages, msg, idx) => {
        return idx < messages.length - 1 && messages[idx + 1].sender._id === msg.sender._id;
    }

    return (
        <ScrollableFeed>
            {
                messages &&
                messages.map((msg, idx) => {
                    return (
                        <div className={`flex ${msg.sender._id === user._id ? 'justify-end' : 'justify-start'} items-center gap-2`} key={idx}>
                            {
                                msg.sender._id !== user._id && !isSameSender(messages, msg, idx) &&
                                <span className="tooltip bw top" data-tooltip={msg.sender.userName}>
                                    <div className='avatar'>
                                        <img src={msg?.sender?.profileDetails?.pfp} alt="avatar" />
                                    </div>
                                </span>
                            }
                            <span className={`border flex items-center justify-center ${msg.sender._id === user._id ? 'bg-[#bee3f8]' : 'bg-[#b9f5d0]'} rounded-2xl py-1 px-5 ${isSameSender(messages, msg, idx) ? 'mt-2 ml-12' : null}`}>
                                {msg.content}
                            </span>
                        </div>
                    )
                })
            }
        </ScrollableFeed>
    )
}

export default ScrollableChat