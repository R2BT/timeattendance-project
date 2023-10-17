const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Define the directory to store uploaded files
const uploadDir = './uploads/';

// Create the upload directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}



const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "time_flow"
});
db.connect();

app.use('/download-pdf', express.static('./uploads/'));

//Login
app.post('/login', (req, res) => {
    let id = req.body.id;
    let pwd = req.body.password;

    if (!id || !pwd) {
        return res.status(400).send({ error: true, message: "Please provide id and password." });
    } else {
        db.query('SELECT * FROM EMPLOYEE WHERE employee_login_id = ? AND employee_login_password = ?', [id, pwd], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "User not found.";
            } else {
                message = "Successfully Login.";
            }
            return res.send({ error: false, data: results, message: message });
        })
    }
})

//DownloadPDF
app.get('/download-pdf/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const normalizedFilePath = path.join(__dirname, 'uploads', filename.replace(/\\/g, path.sep));

    if (fs.existsSync(normalizedFilePath)) {
        const fileBasename = path.basename(normalizedFilePath); // Extract the file name

        res.setHeader('Content-Disposition', `attachment; filename="${fileBasename}"`);
        res.setHeader('Content-Type', 'application/pdf');

        const fileStream = fs.createReadStream(normalizedFilePath);
        fileStream.pipe(res);
    } else {
        res.status(404).send('File not found');
    }
});

//Employee
//GetAllEmployees
app.get('/employees', (req, res) => {
    db.query('SELECT * FROM EMPLOYEE', (error, results, fields) => {
        if (error) throw error;

        let message = ""
        if (results === undefined || results.length == 0) {
            message = "Employee table is empty.";
        } else {
            message = "Sucessfully retrieved all employees."
        }
        return res.send({ error: false, data: results, message: message });
    })
})

//InsertEmployee
app.post('/employee', upload.fields([
    { name: 'employee_profile_img' },
    { name: 'employee_personnel_id_img' },
    { name: 'employee_transcript_img' },
    { name: 'employee_contract' },
]), (req, res) => {
    const {
        employee_title,
        employee_name,
        employee_surname,
        employee_gender,
        employee_department,
        employee_position,
        employee_tel,
        employee_email,
        employee_birthday,
        employee_start_date,
        employee_salary,
        employee_personal_id,
        employee_address,
        employee_bank_account,
        employee_bank_type,
        employee_tax_id,
        employee_login_password,
    } = req.body;

    if (!employee_title || !employee_name || !employee_surname || !employee_gender || !employee_department || !employee_position || !employee_tel || !employee_email || !employee_birthday || !employee_start_date || !employee_salary || !employee_personal_id || !employee_address || !employee_bank_account || !employee_bank_type || !employee_tax_id || !employee_login_password) {
        return res.status(400).send({ error: true, message: 'Please provide all required fields' });
    } else {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send({ error: true, message: 'No files were uploaded.' });
        }

        db.query('SELECT employee_id FROM EMPLOYEE ORDER BY employee_id DESC LIMIT 1', (error, results) => {
            if (error) {
                console.error('Database query error: ' + error.stack);
                return res.status(500).send({ error: true, message: 'Error retrieving the last employee ID' });
            }

            const lastEmployeeId = results[0].employee_id;
            const numericPart = parseInt(lastEmployeeId.substr(1));
            const newEmployeeId = `E${numericPart + 1}`;

            // Get the uploaded PDF files as binary buffers
            const employeeProfileImgBuffer = req.files['employee_profile_img'][0].buffer;
            const employeePersonnelIdImgBuffer = req.files['employee_personnel_id_img'][0].buffer;
            const employeeTranscriptImgBuffer = req.files['employee_transcript_img'][0].buffer;
            const employeeContractBuffer = req.files['employee_contract'][0].buffer;

            // Generate unique filenames for each uploaded file using employee_name
            const profileImgFilename = `${employee_name}_profile-${Date.now()}.pdf`;
            const personnelIdImgFilename = `${employee_name}_personnelId-${Date.now()}.pdf`;
            const transcriptImgFilename = `${employee_name}_transcript-${Date.now()}.pdf`;
            const contractImgFilename = `${employee_name}_contract-${Date.now()}.pdf`;

            // Insert the file paths into the MySQL database
            const sql = `INSERT INTO EMPLOYEE (employee_id, employee_title, employee_name, employee_surname, employee_gender, employee_department, employee_position, employee_tel, employee_email, employee_birthday, employee_start_date, employee_salary, employee_personal_id, employee_address, employee_bank_account, employee_bank_type, employee_tax_id, employee_login_id, employee_login_password, employee_profile_img, employee_personnel_id_img, employee_transcript_img, employee_contract, employee_roles) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [
                newEmployeeId,
                employee_title,
                employee_name,
                employee_surname,
                employee_gender,
                employee_department,
                employee_position,
                employee_tel,
                employee_email,
                employee_birthday,
                employee_start_date,
                employee_salary,
                employee_personal_id,
                employee_address,
                employee_bank_account,
                employee_bank_type,
                employee_tax_id,
                newEmployeeId,
                employee_login_password,
                path.join(uploadDir, profileImgFilename), // Insert file path for profile image
                path.join(uploadDir, personnelIdImgFilename), // Insert file path for personnel ID image
                path.join(uploadDir, transcriptImgFilename), // Insert file path for transcript image
                path.join(uploadDir, contractImgFilename), // Insert file path for contract
                "Employee",
            ];

            db.query(sql, values, (error, results, fields) => {
                if (error) {
                    console.error('Database query error: ' + error.stack);
                    return res.status(500).send({ error: true, message: 'Error adding employee to the database' });
                }

                // If database insertion is successful, save the PDF files to storage
                try {
                    fs.writeFileSync(path.join(uploadDir, profileImgFilename), employeeProfileImgBuffer);
                    fs.writeFileSync(path.join(uploadDir, personnelIdImgFilename), employeePersonnelIdImgBuffer);
                    fs.writeFileSync(path.join(uploadDir, transcriptImgFilename), employeeTranscriptImgBuffer);
                    fs.writeFileSync(path.join(uploadDir, contractImgFilename), employeeContractBuffer);
                } catch (fileError) {
                    console.error('Error saving files to storage: ' + fileError.stack);
                    return res.status(500).send({ error: true, message: 'Error saving files to storage' });
                }

                return res.send({ error: false, data: results, message: 'Employee successfully added' });
            });
        });
    }
});


//GetEmployeeByID
app.get('/employee/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide employee id.' });
    }

    db.query('SELECT * FROM EMPLOYEE WHERE employee_id = ?', id, (error, results, fields) => {
        if (error) {
            console.error('Database query error: ' + error.stack);
            return res.status(500).send({ error: true, message: 'Error retrieving employee' });
        }

        if (results === undefined || results.length === 0) {
            return res.status(404).send({ error: true, message: 'Employee not found.' });
        }

        // Assuming the PDF file is stored in the database as a base64-encoded string
        const employeeData = results[0];

        if (
            !employeeData.employee_profile_img ||
            !employeeData.employee_personnel_id_img ||
            !employeeData.employee_transcript_img ||
            !employeeData.employee_contract
        ) {
            // Handle the case where the PDF data is missing
            return res.status(500).send({ error: true, message: 'PDF data not found for this employee.' });
        }

        return res.send({ error: false, data: employeeData, message: 'Successfully retrieved employee.' });
    });
});

//UpdateEmployeeByID
app.put('/employee/:id', upload.fields([
    { name: 'employee_profile_img' },
    { name: 'employee_personnel_id_img' },
    { name: 'employee_transcript_img' },
    { name: 'employee_contract' },
]), (req, res) => {
    const employeeId = req.params.id;
    const {
        employee_title,
        employee_name,
        employee_surname,
        employee_gender,
        employee_department,
        employee_position,
        employee_tel,
        employee_email,
        employee_birthday,
        employee_start_date,
        employee_salary,
        employee_personal_id,
        employee_address,
        employee_bank_account,
        employee_bank_type,
        employee_tax_id,
        employee_login_id,
        employee_login_password,
    } = req.body;

    if (!employeeId || !employee_title || !employee_name || !employee_surname || !employee_gender || !employee_department || !employee_position || !employee_tel || !employee_email || !employee_birthday || !employee_start_date || !employee_salary || !employee_personal_id || !employee_address || !employee_bank_account || !employee_bank_type || !employee_tax_id || !employee_login_id || !employee_login_password) {
        return res.status(400).send({ error: true, message: 'Please provide all required fields' });
    } else {
        const updateData = {
            employee_title,
            employee_name,
            employee_surname,
            employee_gender,
            employee_department,
            employee_position,
            employee_tel,
            employee_email,
            employee_birthday,
            employee_start_date,
            employee_salary,
            employee_personal_id,
            employee_address,
            employee_bank_account,
            employee_bank_type,
            employee_tax_id,
            employee_login_id,
            employee_login_password,
        };

        if (req.files) {
            // Check if new files have been uploaded and update the data accordingly
            if (req.files['employee_profile_img']) {
                updateData.employee_profile_img = `${employee_name}_profile-${Date.now()}.pdf`;
                fs.writeFileSync(path.join(uploadDir, updateData.employee_profile_img), req.files['employee_profile_img'][0].buffer);
            }
            if (req.files['employee_personnel_id_img']) {
                updateData.employee_personnel_id_img = `${employee_name}_personnelId-${Date.now()}.pdf`;
                fs.writeFileSync(path.join(uploadDir, updateData.employee_personnel_id_img), req.files['employee_personnel_id_img'][0].buffer);
            }
            if (req.files['employee_transcript_img']) {
                updateData.employee_transcript_img = `${employee_name}_transcript-${Date.now()}.pdf`;
                fs.writeFileSync(path.join(uploadDir, updateData.employee_transcript_img), req.files['employee_transcript_img'][0].buffer);
            }
            if (req.files['employee_contract']) {
                updateData.employee_contract = `${employee_name}_contract-${Date.now()}.pdf`;
                fs.writeFileSync(path.join(uploadDir, updateData.employee_contract), req.files['employee_contract'][0].buffer);
            }
        }

        // Update the employee information in the MySQL database
        const sql = `
        UPDATE EMPLOYEE
        SET ?
        WHERE employee_id = ?`;

        db.query(sql, [updateData, employeeId], (error, results, fields) => {
            if (error) {
                console.error('Database query error: ' + error.stack);
                return res.status(500).send({ error: true, message: 'Error updating employee information' });
            }

            let message = '';
            if (results.changedRows === 0) {
                message = 'Employee not found or data are the same';
            } else {
                message = 'Employee updated successfully';
            }
            return res.send({ error: false, data: results, message: message });
        });
    }
});

//UpdateEmployeeRoleByID
app.put('/employee/:id/role', (req, res) => {
    const employeeId = req.params.id;
    const { employee_roles } = req.body;

    if (!employeeId) {
        return res.status(400).send({ error: true, message: 'Please provide the employee ID and status to update' });
    } else {
        const sql = 'UPDATE EMPLOYEE SET employee_roles = ? WHERE employee_id = ?';

        db.query(sql, [employee_roles, employeeId], (error, results, fields) => {
            if (error) {
                console.error('Database query error: ' + error.stack);
                return res.status(500).send({ error: true, message: 'Error updating employee role' });
            }

            let message = "";
            if (results.changedRows === 0) {
                message = "Employee not found or data are the same";
            } else {
                message = "Employee updated successfully";
            }
            return res.send({ error: false, data: results, message: message });
        });
    }
});

//DeleteEmployeeByID
app.delete('/employee/:id', (req, res) => {
    const employeeId = req.params.id;

    if (!employeeId) {
        return res.status(400).send({ error: true, message: 'Please provide the employee ID to delete' });
    } else {
        const sql = 'DELETE FROM EMPLOYEE WHERE employee_id = ?';

        db.query(sql, [employeeId], (error, results, fields) => {
            if (error) {
                console.error('Database query error: ' + error.stack);
                return res.status(500).send({ error: true, message: 'Error deleting employee from the database' });
            }

            let message = "";
            if (results.affectedRows === 0) {
                message = ""; 'Employee not found';
            } else {
                message = "Employee delete successfully";
            }

            return res.send({ error: false, message: message });
        });
    }
});


//Attendance
//GetAllAttendances
app.get('/attendances', (req, res) => {
    db.query("SELECT * FROM EMPLOYEE INNER JOIN ATTENDANCE ON EMPLOYEE.employee_id = ATTENDANCE.employee_id;", (error, results, fields) => {
        if (error) throw error;

        let message = "";
        if (results === undefined || results.length == 0) {
            message = "Attendance not found.";
        } else {
            message = "Successfully retrieved all attendances.";
        }
        return res.send({ error: false, data: results, message: message });
    })
})

//InsertAttendance
app.post('/attendance', (req, res) => {
    const {
        employee_id,
        attendance_date,
        attendance_time,
        attendance_type,
        attendance_note
    } = req.body;

    if (!employee_id || !attendance_date || !attendance_time || !attendance_type) {
        return res.status(400).send({ error: true, message: 'Please provide all required fields: employee_id, attendance_date, attendance_time, attendance_type' });
    }
    else {
        const sql = 'INSERT INTO ATTENDANCE (employee_id, attendance_date, attendance_time, attendance_type, attendance_note) VALUES (?, ?, ?, ?, ?)';

        db.query(sql, [employee_id, attendance_date, attendance_time, attendance_type, attendance_note], (error, results, fields) => {
            if (error) {
                console.error('Database query error: ' + error.stack);
                return res.status(500).send({ error: true, message: 'Error creating attendance record' });
            }

            return res.send({ error: false, data: results, message: 'Attendance record created successfully' });
        });
    }
});


//GetAttendanceByEmployeeID
app.get('/attendance/employee/:id', (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: "Please provide id." });
    } else {
        db.query("SELECT * FROM EMPLOYEE INNER JOIN ATTENDANCE ON EMPLOYEE.employee_id = ATTENDANCE.employee_id WHERE EMPLOYEE.employee_id = ?", id, (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "Attendance not found.";
            }
            else {
                message = "Successfully retrieved attendance.";
            }
            return res.send({ error: false, data: results, message: message });
        })
    }
})

//LeaveRequest
//GetAllLeaveRequests
app.get('/leaveRequests', (req, res) => {
    db.query('SELECT * FROM EMPLOYEE INNER JOIN LEAVE_REQUEST ON EMPLOYEE.employee_id = LEAVE_REQUEST.employee_id;', (error, results, fields) => {
        if (error) throw error;

        let message = "";
        if (results === undefined || results.length == 0) {
            message = "Leave Request not found.";
        } else {
            message = "Successfully retrieved all leave requests.";
        }
        return res.send({ error: false, data: results, message: message });
    })
})

//GetAllLeaveRequestsByWaitingStatus
app.get('/leaveRequests/status', (req, res) => {
    db.query('SELECT * FROM EMPLOYEE INNER JOIN LEAVE_REQUEST ON EMPLOYEE.employee_id = LEAVE_REQUEST.employee_id WHERE LEAVE_REQUEST.leave_request_status = "รอดำเนินการ";', (error, results, fields) => {
        if (error) throw error;

        let message = "";
        if (results === undefined || results.length == 0) {
            message = "Leave Request not found.";
        } else {
            message = "Successfully retrieved all leave requests by waiting status.";
        }
        return res.send({ error: false, data: results, message: message });
    })
})

//InsertLeaveRequest
app.post('/leaveRequest', (req, res) => {
    const {
        employee_id,
        leave_request_type,
        leave_request_duration,
        leave_request_start_date,
        leave_request_end_date,
        leave_request_note,
    } = req.body;

    if (!employee_id || !leave_request_type || !leave_request_duration || !leave_request_start_date || !leave_request_end_date) {
        return res.status(400).send({ error: true, message: 'Please provide all required fields: employee_id, leave_request_type, leave_request_duration, leave_request_start_date, leave_request_end_date' });
    }

    const sql = 'INSERT INTO LEAVE_REQUEST (employee_id, leave_request_type, leave_request_duration, leave_request_start_date, leave_request_end_date, leave_request_note, leave_request_status) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [employee_id, leave_request_type, leave_request_duration, leave_request_start_date, leave_request_end_date, leave_request_note, "รอดำเนินการ"], (error, results, fields) => {
        if (error) {
            console.error('Database query error: ' + error.stack);
            return res.status(500).send({ error: true, message: 'Error creating leave request' });
        }

        return res.send({ error: false, data: results, message: 'Leave request created successfully' });
    });
});

//GetLeaveRequestByEmployeeID
app.get('/leaveRequest/employee/:id', (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: "Please provide id." });
    } else {
        db.query("SELECT * FROM EMPLOYEE INNER JOIN LEAVE_REQUEST ON EMPLOYEE.employee_id = LEAVE_REQUEST.employee_id WHERE EMPLOYEE.employee_id = ?", id, (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "Leave Request not found.";
            } else {
                message = "Successfully retrieved leave request.";
            }
            return res.send({ error: false, data: results, message: message });
        })
    }
})

//UpdateLeaveRequestStatusByID
app.put('/leaveRequest/:id/status', (req, res) => {
    const leaveRequestId = req.params.id;
    const { leave_request_status } = req.body;

    if (!leaveRequestId || !leave_request_status) {
        return res.status(400).send({ error: true, message: 'Please provide leave request ID and leave request status to update' });
    }

    const sql = 'UPDATE LEAVE_REQUEST SET leave_request_status = ? WHERE leave_request_id  = ?';

    db.query(sql, [leave_request_status, leaveRequestId], (error, results, fields) => {
        if (error) {
            console.error('Database query error: ' + error.stack);
            return res.status(500).send({ error: true, message: 'Error updating leave request status' });
        }

        let message = "";
        if (results.changedRows === 0) {
            message = "Leave request not found or status is the same";
        } else {
            message = "Leave request status updated successfully";
        }
        return res.send({ error: false, data: results, message: message });
    });
});



app.listen(3000, () => {
    console.log('Node App is running on port 3000');
})