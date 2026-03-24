const { MailtrapClient } = require("mailtrap");

const TOKEN = "43ed20dc576693cf97855ebc2c2e34eb";

const client = new MailtrapClient({
    token: TOKEN,
    testInboxId: 4485296,
});

const sender = {
    email: "hello@example.com",
    name: "System Admin",
};

module.exports = {
    sendMail: async function (to, subject, htmlContent, textContent = null) {
        try {
            const recipients = Array.isArray(to) ? to.map(email => ({ email })) : [{ email: to }];
            
            await client.testing.send({
                from: sender,
                to: recipients,
                subject: subject,
                html: htmlContent,
                text: textContent || htmlContent, // Fallback to HTML if text not provided
                category: "User Import",
            });
        } catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    }
}
