const Notification = require("../models/Notification")

exports.fetchNotifications = async (req, res) => {
    try {
        const { id } = req.user;
        const notifications = await Notification.find({ for: id }).sort({ createdAt: -1 });
        const formattedNotifications = notifications.map(notification => {
            const date = new Date(notification.createdAt);
            const formattedDate = date.toISOString().split('T')[0];
            const formattedTime = date.toTimeString().split(' ')[0].slice(0, 5);

            return {
                ...notification,
                createdAt: {
                    date: formattedDate,
                    time: formattedTime
                }
            };
        });
        res.status(200).json({
            success: true,
            data: formattedNotifications
        });
    } catch (error) {
        console.error(error);
        // Send error response
        res.status(500).json({ message: 'Internal server error' });
    }
};