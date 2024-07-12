<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Inclua o arquivo autoload.php
require 'vendor/autoload.php';
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

// Carregar variáveis de ambiente
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $num_pessoas = htmlspecialchars($_POST['num_pessoas']);
    $telefone = htmlspecialchars($_POST['telefone']);
    $email = htmlspecialchars($_POST['email']);
    $regime = htmlspecialchars($_POST['regime']);
    $ramo = htmlspecialchars($_POST['ramo']);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);
    try {
        // Configurações do servidor SMTP
        $mail->isSMTP();
        $mail->Host = $_ENV['SMTP_HOST'];
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['SMTP_USERNAME'];
        $mail->Password = $_ENV['SMTP_PASSWORD'];
        $mail->SMTPSecure = 'tls';
        $mail->Port = $_ENV['SMTP_PORT'];

        // Configurações do email
        $mail->setFrom($_ENV['FROM_EMAIL'], $_ENV['FROM_NAME']);
        $mail->addAddress($_ENV['TO_EMAIL']);
        $mail->addReplyTo($email, $name);

        // Conteúdo do email
        $mail->isHTML(false);
        $mail->Subject = 'Nova mensagem de contato';
        $mail->Body    = "Nome: $name\nNúmero de pessoas na folha: $num_pessoas\nTelefone: $telefone\nEmail: $email\nRegime tributário: $regime\nRamo de atuação: $ramo\nMensagem: $message";

        $mail->send();
        echo 'Email enviado com sucesso.';
    } catch (Exception $e) {
        echo "Erro ao enviar o email. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Método de requisição inválido.";
}
?>
