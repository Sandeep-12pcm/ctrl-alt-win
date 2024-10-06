<?php
// Initialize variables
$name = $email = $subject = $message = "";
$nameErr = $emailErr = $subjectErr = $messageErr = "";
$successMessage = "";

// Form submission handling
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["name"])) {
        $nameErr = "Name is required.";
    } else {
        $name = htmlspecialchars($_POST["name"]);
    }

    if (empty($_POST["email"])) {
        $emailErr = "Email is required.";
    } elseif (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        $emailErr = "Invalid email format.";
    } else {
        $email = htmlspecialchars($_POST["email"]);
    }

    if (empty($_POST["subject"])) {
        $subjectErr = "Subject is required.";
    } else {
        $subject = htmlspecialchars($_POST["subject"]);
    }

    if (empty($_POST["message"])) {
        $messageErr = "Message is required.";
    } else {
        $message = htmlspecialchars($_POST["message"]);
    }

    // If no errors, send email
    if (empty($nameErr) && empty($emailErr) && empty($subjectErr) && empty($messageErr)) {
        $to = "your-email@example.com"; // Change to your email
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";

        if (mail($to, $subject, $message, $headers)) {
            $successMessage = "Message sent successfully!";
            // Reset form values
            $name = $email = $subject = $message = "";
        } else {
            $successMessage = "Failed to send message.";
        }
    }
}
?>