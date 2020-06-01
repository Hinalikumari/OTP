import styles from '../css/style.css';

const template = document.createElement('template');
template.innerHTML = `
  <style>${styles.toString()}</style>
  <ul>
    <slot>
      <p>You have nothing to do, yay!</p>
    </slot>
  </ul>
  <input id="new-item"/>
  <button>Add</button>
`;

InitPlugin = (function () {
    let defaults = { email: 'test@test.com', phone: '+1(123)456-7890', channel: 'all' };
    let modal, modalDialog, modalContent;
    let settings = {};
    document.addEventListener("DOMContentLoaded", () => {
        InitPlugin();
    });

    function InitPlugin() {
        let pluginSelector = document.querySelector('script[data-id="otp-plugin-script"]');
        settings['email'] = pluginSelector.getAttribute('data-email')
        settings['channel'] = pluginSelector.getAttribute('data-channel')
        settings['phone'] = pluginSelector.getAttribute('data-phone')
        settings = Object.assign(defaults, settings)
        document.addEventListener('click', eventHandler, false);
    }

    let eventHandler = function (event) {
        switch (event.target.id) {
            case 'otp-widget-btn':
                selectMethodOfContactModal()
                break
            case 'send-otp-btn':
                validateInput()
                break
            case 'submit-otp-btn':
                hideModal('otpInput')
                submitOtpModal()
                break
            default:
                break
        }
    };

    function validateInput() {
        let selectedRadio = document.querySelector('input[name="channel"]:checked')
        if (selectedRadio) {
            hideModal('otpSelection');
            openInputOtpModal();
        }
        else {
            alert("Select Method of Contact")
        }

    };

    function selectMethodOfContactModal() {
        modal = document.createElement('div');
        modal.id = "myModal"
        modal.className = "modal fade show"
        //  modal.classList.add('modal');
        modal.setAttribute("role", "dialog");
        modal.setAttribute("style", "position\:relative;");
        // modal.style.position = 'relative';
        modal.style.display = 'block';
        modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog');
        modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');
        const modalLogo = document.createElement('div');
        modalLogo.classList.add('modal-logo');
        const img = document.createElement('img');
        img.classList.add("img-fluid");
        img.setAttribute("src", "./src/images/logo.png");
        const modalButton = document.createElement("button");
        modalButton.className = "close";
        modalButton.type = "button";
        modalButton.innerHTML = "&times;";
        modalButton.setAttribute("data-dismiss", "modal");

        // header.innerHTML = `Hello`;

        const modalBody = document.createElement('div')
        modalBody.classList.add('modal-body');
        modalBody.id = "otpSelection";
        modalBody.style.display = 'block';
        const citizens = document.createElement('div')
        citizens.classList.add('citizens_con');
        const h3 = document.createElement('h3')
        h3.innerHTML = `Keep your account safe`;
        const p1 = document.createElement('p')
        p1.innerHTML = `We need to send you a verification code from Citizens Bank. Where would you like it sent ?`
        const otpSelection = document.createElement('div');
        otpSelection.classList.add('otp_sel');
        let radio1, radio2, label1, label2, label
        if (settings.channel === 'all') {
            label = document.createElement('label');
            label.innerText = "Select Method of Contact";
            radio1 = document.createElement('input');
            radio2 = document.createElement('input');
            radio1.type = 'radio';
            radio2.type = 'radio';
            radio1.id = 'email';
            radio2.id = 'phone';
            radio1.name = 'channel';
            radio2.name = 'channel';
            radio1.value = settings.email
            radio2.value = settings.phone

            label1 = document.createElement('label')
            label2 = document.createElement('label')
            label1.htmlFor = 'email';
            label1.innerText = 'Email';
            label2.htmlFor = 'phone';
            label2.innerText = 'Phone';
        } else if (settings.channel === 'email') {
            radio1 = document.createElement('input');
            radio1.type = 'radio';
            radio1.id = 'email';
            radio1.name = 'channel';
            radio1.value = settings.email
            label1 = document.createElement('label')
            label1.htmlFor = 'email';
            label1.innerText = 'Email';
        } else if (settings.channel === 'phone') {
            radio2 = document.createElement('input');
            radio2.type = 'radio';
            radio2.id = 'phone';
            radio2.name = 'channel';
            radio2.value = settings.phone
            label2 = document.createElement('label')
            label2.htmlFor = 'phone';
            label2.innerText = 'Phone';
        }
        let newline = document.createElement('br');
        let sendOtp = document.createElement('div');
        sendOtp.className = "send_otp";
        let nextBtn = document.createElement('button');
        nextBtn.setAttribute('id', 'send-otp-btn')
        nextBtn.setAttribute('class', 'button button2 otp_btn')
        nextBtn.innerText = 'SEND OTP'
        // otpSelection.appendChild(header);
        if (settings.channel === 'email' || settings.channel === 'all') {
            otpSelection.appendChild(radio1);
            otpSelection.appendChild(label1);
            otpSelection.appendChild(newline);
        }
        if (settings.channel === 'phone' || settings.channel === 'all') {
            otpSelection.appendChild(radio2);
            otpSelection.appendChild(label2);

        }
        modalLogo.appendChild(img);
        modalHeader.appendChild(modalLogo);
        //modalHeader.appendChild(modalButton);
        modalBody.appendChild(citizens);
        citizens.appendChild(h3);
        citizens.appendChild(p1);
        citizens.appendChild(otpSelection);
        citizens.appendChild(sendOtp);
        sendOtp.appendChild(nextBtn);
        //modalBody.appendChild(otpSel);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);
        //modal.appendChild(otpSelection);
        document.body.appendChild(modal);
    }

    function openInputOtpModal() {
        // const modal = document.createElement('div')

        const otpInput = document.createElement('div')
        otpInput.className = "modal-body"
        otpInput.setAttribute("id", "otpInput");
        const citizensCon = document.createElement('div')
        citizensCon.className = "citizens_con"
        // let header = document.createElement('h3');
        const h3 = document.createElement('h3')
        //  h3.innerHTML = `Keep your account safe`;

        let selectedRadio = document.querySelector('input[name="channel"]:checked')
        h3.innerHTML = `Verify by ${selectedRadio.id}`;
        const p1 = document.createElement('p')
        p1.innerHTML = `We just sent you a verification code by ${selectedRadio.id} to ${selectedRadio.value}`;
        let textBox = document.createElement('input');
        textBox.type = 'text';
        textBox.id = 'otp-value';
        textBox.maxLength = 7;

        let label1 = document.createElement('label')
        label1.htmlFor = 'otp-value';
        label1.innerText = 'Enter OTP';

        let newline = document.createElement('br');
        let sendOtp = document.createElement('div');
        sendOtp.className = "send_otp";
        let submitBtn = document.createElement('button');
        submitBtn.setAttribute('id', 'submit-otp-btn');
        submitBtn.setAttribute('class', 'button button2 otp_btn');
        submitBtn.innerText = 'SUBMIT OTP';

        let resendCode = document.createElement('div');
        resendCode.className = "resend";
        let p2 = document.createElement('p');
        p2.innerHTML = `Didn't receive the code?`
        let a = document.createElement('a');
        a.setAttribute("href", "#");
        a.innerText = "Send code again"
        citizensCon.appendChild(h3);
        citizensCon.appendChild(p1);
        citizensCon.appendChild(textBox);
        citizensCon.appendChild(sendOtp);
        sendOtp.appendChild(submitBtn);
        citizensCon.appendChild(resendCode);
        resendCode.appendChild(p2);
        resendCode.appendChild(a);
        otpInput.appendChild(citizensCon);
        modalContent.appendChild(otpInput);

    }

    function submitOtpModal() {
        const submitOtp = document.createElement('div')
        submitOtp.className = "modal-body";
        let h3 = document.createElement('h3');
        h3.innerHTML = `OTP submitted`;
        const p1 = document.createElement('p')
        p1.innerHTML = `OTP has been submitted successfully`;
        submitOtp.appendChild(h3);
        submitOtp.appendChild(p1);
        modalContent.appendChild(submitOtp);
    }

    function hideModal(modalId) {
        let modal = document.getElementById(modalId);
        modal.style.display = 'none';
    }
    return InitPlugin;
})();
