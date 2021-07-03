let user_name = document.getElementById('usernameInput')
let email_address = document.getElementById('emailInput')
let password_first = document.getElementById('passwordInput')
let password_second = document.getElementById('passwordRepeat')
let submit_button = document.getElementById('registration_button')
let register_form = document.getElementById('main_form')
let main_div = document.getElementById('main_class_container')

submit_button.addEventListener('click', () => {
    if (user_name.value === '') {
        user_name.setCustomValidity('Username field is need to be filled')
    } else {
        user_name.setCustomValidity('')
    }
})

submit_button.addEventListener('click', () => {
    if (email_address.value === '') {
        email_address.setCustomValidity('Username field is need to be filled')
    } else if (email_address.validity.typeMismatch) {
        email_address.setCustomValidity('Please follow the requested formula')
    } else {
        email_address.setCustomValidity('')
    }
})

function validatePassword () {
    if (password_first.value !== password_second.value) {
        password_second.setCustomValidity('Passwords do not match')
    } else {
        password_second.setCustomValidity('')
    }
}
password_second.onchange = validatePassword
password_second.onkeyup = validatePassword

function store_Data () {
    localStorage.setItem('user_inStore', user_name.value)
    localStorage.setItem('password_inStore', password_second.value)
}

function sendRequest () {

    let stored_username = localStorage.getItem('user_inStore')
    let stored_password = localStorage.getItem('password_inStore')

    let login_h1 = document.createElement('h1')
    login_h1.innerText = 'Log in'
    login_h1.style.margin = '30px'
    let form = document.createElement('form')
    form.method = 'post'
    let username_text = document.createElement('span')
    username_text.innerText = 'Username'
    username_text.style.margin = '10px'
    let input_username = document.createElement('input')
    input_username.setAttribute('type', 'text')
    input_username.setAttribute('placeholder', 'Username')
    input_username.size = 30
    let password_text = document.createElement('span')
    password_text.innerText = 'Password'
    password_text.style.margin = '10px'
    let input_password = document.createElement('input')
    input_password.setAttribute('type', 'password')
    input_password.setAttribute('placeholder', 'Password')
    input_password.size = 30
    let login_button = document.createElement('button')
    login_button.innerText = 'Sign in'
    login_button.style.background = 'linear-gradient(95deg, #00C9FF, #92FE9D)'
    login_button.style.color = '#FFFFFF'
    login_button.onclick = function () {
        if (input_username.value === stored_username && input_password.value === stored_password) {
            login_h1.remove()
            username_text.remove()
            input_username.remove()
            password_text.remove()
            input_password.remove()
            login_button.remove()

            let canvas_input = document.createElement('input')
            canvas_input.setAttribute('type', 'text')
            canvas_input.setAttribute('placeholder', 'Text goes here')

            let canvas = document.createElement('canvas')
            let ctx = canvas.getContext('2d')
            canvas.height = 470
            canvas.width = 900
            canvas.style.border = '3px solid white'
            canvas.style.borderRadius = '20px'

            let x = 100
            let y = 100
            let dx = 10
            let dy = 3
            let height = 10

            let btn_canvas = document.createElement('button')
            btn_canvas.innerText = 'Draw on canvas'
            btn_canvas.onclick = function moveCanvas () {

                let metrics = ctx.measureText(canvas_input.value)
                let text_width = metrics.width
                requestAnimationFrame(moveCanvas)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.fillStyle = 'black'
                ctx.font = '36px Times New Roman'
                ctx.fillText(canvas_input.value, x, y)

                if ((x + text_width > canvas.width) || (x <= 0)) {
                    dx = -dx
                }

                if ((y > canvas.height) || (y <= height/2)) {
                    dy = -dy
                }
                x += dx
                y += dy
            }

            let logout_btn = document.createElement('button')
            logout_btn.innerText = 'Log out'
            logout_btn.onclick = function () {

                canvas_input.remove()
                btn_canvas.remove()
                canvas.remove()
                logout_btn.remove()

                main_div.appendChild(register_form)

            }

            main_div.appendChild(canvas_input)
            main_div.appendChild(btn_canvas)
            main_div.appendChild(canvas)
            main_div.appendChild(logout_btn)

        } else {
            alert('Please type the correct username and password')
        }
    }
    main_div.appendChild(login_h1)
    main_div.appendChild(username_text)
    main_div.appendChild(input_username)
    main_div.appendChild(password_text)
    main_div.appendChild(input_password)
    main_div.appendChild(login_button)
    register_form.remove()
}