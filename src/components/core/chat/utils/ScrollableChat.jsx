import React from 'react'
import { useSelector } from 'react-redux'
import ScrollableFeed from 'react-scrollable-feed'

const ScrollableChat = ({ messages }) => {

    const user = useSelector(state => state.user);

    const isSameSender = (messages, msg, idx, userId) => {
        return (
            idx < messages.length - 1 &&
            (messages[idx + 1].sender._id !== msg.sender._id || messages[idx + 1].sender._id === undefined) &&
            messages[idx].sender._id !== userId
        )
    }
    const isLastMsg = (messages, idx, userId) => {
        return (
            idx === messages.length - 1 &&
            messages[messages.length - 1].sender._id !== userId &&
            messages[messages.length - 1].sender._id
        )
    }
    const isSameSenderMargin = (messages, msg, idx, userId) => {
        if (idx < messages.length - 1 && messages[idx + 1].sender._id !== msg.sender._id && messages[idx].sender._id !== userId) {
            return 32;
        }
        else if ((idx < messages.length - 1 && messages[idx + 1].sender._id !== msg.sender._id && messages[idx].sender._id !== user._id) || (idx === messages.length - 1 && messages[idx].sender._id !== user._id)) {
            return 0;
        }
        else {
            return "auto"
        }
    }
    const isSameUser = (messages, msg, idx) => {
        return idx > 0 && messages[idx - 1].sender._id === msg.sender._id;
    }

    return (
        <ScrollableFeed>
            {
                messages &&
                messages.map((msg, idx) => {
                    return (
                        <div className='flex' key={idx}>
                            {
                                (isSameSender(messages, msg, idx, user._id) || isLastMsg(messages, idx, user._id)) &&
                                <span class="tooltip bw bottom" data-tooltip={msg.sender.userName}>
                                    <div className='avatar'>
                                        <img src={msg?.sender?.profileDetails?.pfp} alt="avatar" />
                                    </div>
                                </span>
                            }
                            <span className={`${msg.sender._id === user._id ? 'bg-[#bee3f8]' : 'bg-[#b9f5d0]'} rounded-2xl py-1 px-5 max-w-[75%] ml-[${isSameSenderMargin(messages, msg, idx, user._id)}] ${isSameUser(messages, msg, idx) ? 'mt-3' : 'mt-10'}`}>
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