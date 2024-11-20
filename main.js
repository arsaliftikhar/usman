let userName = document.getElementById("username");
let email = document.getElementById("email");
let alertMessage = document.getElementById("alertMessage");
let tableRecord = document.getElementById("tableRecord");

loadData()


userName.addEventListener('keyup',function()
{
    if(userName.value=='')
    {
        userName.classList.add('is-invalid');
        userName.classList.remove('is-valid');
    }
    else
    {
        userName.classList.add('is-valid');
        userName.classList.remove('is-invalid');
        alertMessage.innerHTML = '';
    }
})



email.addEventListener('keyup',function()
{
    if(email.value=='')
    {
        email.classList.add('is-invalid');
        email.classList.remove('is-valid');
    }
    else
    {
        email.classList.add('is-valid');
        email.classList.remove('is-invalid');
        alertMessage.innerHTML = '';
    }
})



function submitForm()
{
    if (confirm("Are you sure you want to submit this form?") != true) {
        return
    }


    if (userName.value == '') {
        userName.classList.add('is-invalid');
        iziToast.error({
            title: 'Error',
            message: 'Enter username',
            position: 'topCenter'
        });
        return
    }

    if (email.value == '') {
        email.classList.add('is-invalid');
        iziToast.error({
            title: 'Error',
            message: 'Enter email',
        });
        return
    }

    let data = {
        user_name: userName.value,
        email: email.value
    }
    


    let record = localStorage.getItem('record')

    if(record===null)
    {
        localStorage.setItem('record',JSON.stringify([data]))
    }
    else
    {
        record = JSON.parse(record)
        record.push(data)
        localStorage.setItem('record',JSON.stringify(record))
    }
    


    loadData()
    iziToast.success({
        title: 'Success',
        message: 'Form submitted successfully',
        position:'topCenter'
    });
    userName.value='';
    email.value='';
    userName.classList.remove('is-valid');
    email.classList.remove('is-valid');
}



function loadData()
{
    let record = localStorage.getItem('record');

    if(record===null)
    {
        tableRecord.innerHTML = `<div class="mt-5 text-center">No Record Found</div>`
    }
    else
    {
        record = JSON.parse(record)
        
        let table = '<table class="table table-bordered table-dark mt-5">';
        table +=`<tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
        </tr>`
        for(var i=0; i<=record.length-1; i++)
        {
            console.log(record[i])
            table += `<tr>
            <td>${record[i].user_name}</td>
            <td>${record[i].email}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteData(${i})">Delete</button>
                <button class="btn btn-info btn-sm" onclick="updateData(${i})">Update</button>
            </td>
            </tr>`;
        }

        table += '</table>';

        tableRecord.innerHTML = table;
    }
}




function resetForm()
{
    localStorage.removeItem('record');
    iziToast.success({
        title: 'Success',
        message: 'Form reset successfully',
        position:'topCenter'
    });
    loadData()
}


function deleteData(index)
{
    console.log("Delete this index",index)
}

function updateData(index)
{
    console.log("Update this index",index)
}