import React, { useState, useEffect } from 'react';

const initialData = {
  hospitals: [],
  doctors: [],
  patients: [],
  appointments: [],
};

const roles = {
  HOSPITAL_ADMIN: 'Hospital Admin',
  DOCTOR: 'Doctor',
  PATIENT: 'Patient',
};

function HospitalAppointmentSystem() {
  const [data, setData] = useState(initialData);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [view, setView] = useState('login'); // login, register, dashboard

  // Utility functions
  const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

  // Registration handlers
  const registerHospitalAdmin = (hospitalName, location) => {
    // Create hospital and admin user
    const hospitalId = generateId();
    const newHospital = { id: hospitalId, name: hospitalName, location, departments: [] };
    const adminId = generateId();
    const newAdmin = { id: adminId, role: roles.HOSPITAL_ADMIN, hospitalId, name: 'Admin' };
    setData(prev => ({
      ...prev,
      hospitals: [...prev.hospitals, newHospital],
      doctors: [...prev.doctors],
      patients: [...prev.patients],
    }));
    setCurrentUser(newAdmin);
    setCurrentRole(roles.HOSPITAL_ADMIN);
    setView('dashboard');
  };

  // More detailed implementation will follow for all features...

  // For brevity, this is a placeholder UI
  const [formData, setFormData] = React.useState({});
  const [message, setMessage] = React.useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role) => {
    setCurrentRole(role);
    setFormData({});
    setMessage('');
    setView('register');
  };

  const handleRegister = () => {
    if (currentRole === roles.HOSPITAL_ADMIN) {
      if (!formData.hospitalName || !formData.location) {
        setMessage('Please enter hospital name and location.');
        return;
      }
      const hospitalId = generateId();
      const newHospital = { id: hospitalId, name: formData.hospitalName, location: formData.location, departments: [] };
      setData(prev => ({
        ...prev,
        hospitals: [...prev.hospitals, newHospital],
      }));
      const adminUser = { id: generateId(), role: roles.HOSPITAL_ADMIN, hospitalId, name: 'Admin' };
      setCurrentUser(adminUser);
      setView('dashboard');
      setMessage('');
    } else if (currentRole === roles.DOCTOR) {
      if (!formData.name || !formData.qualifications || !formData.specializations || !formData.experience) {
        setMessage('Please fill all doctor fields.');
        return;
      }
      const newDoctor = {
        id: generateId(),
        role: roles.DOCTOR,
        name: formData.name,
        qualifications: formData.qualifications,
        specializations: formData.specializations.split(',').map(s => s.trim()),
        experience: parseInt(formData.experience),
        hospitalAssociations: [],
      };
      setData(prev => ({
        ...prev,
        doctors: [...prev.doctors, newDoctor],
      }));
      setCurrentUser(newDoctor);
      setView('dashboard');
      setMessage('');
    } else if (currentRole === roles.PATIENT) {
      if (!formData.name || !formData.gender || !formData.dob || !formData.uniqueId) {
        setMessage('Please fill all patient fields.');
        return;
      }
      const newPatient = {
        id: generateId(),
        role: roles.PATIENT,
        name: formData.name,
        gender: formData.gender,
        dob: formData.dob,
        uniqueId: formData.uniqueId,
      };
      setData(prev => ({
        ...prev,
        patients: [...prev.patients, newPatient],
      }));
      setCurrentUser(newPatient);
      setView('dashboard');
      setMessage('');
    }
  };

  const renderRegistrationForm = () => {
    if (!currentRole) return null;
    if (currentRole === roles.HOSPITAL_ADMIN) {
      return (
        <div>
          <h2>Hospital Admin Registration</h2>
          <label>
            Hospital Name:
            <input type="text" name="hospitalName" value={formData.hospitalName || ''} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Location:
            <input type="text" name="location" value={formData.location || ''} onChange={handleInputChange} />
          </label>
          <br />
          <button onClick={handleRegister}>Register</button>
        </div>
      );
    } else if (currentRole === roles.DOCTOR) {
      return (
        <div>
          <h2>Doctor Registration</h2>
          <label>
            Name:
            <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Qualifications:
            <input type="text" name="qualifications" value={formData.qualifications || ''} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Specializations (comma separated):
            <input type="text" name="specializations" value={formData.specializations || ''} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Years of Experience:
            <input type="number" name="experience" value={formData.experience || ''} onChange={handleInputChange} />
          </label>
          <br />
          <button onClick={handleRegister}>Register</button>
        </div>
      );
    } else if (currentRole === roles.PATIENT) {
      return (
        <div>
          <h2>Patient Registration</h2>
          <label>
            Name:
            <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Gender:
            <select name="gender" value={formData.gender || ''} onChange={handleInputChange}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <br />
          <label>
            Date of Birth:
            <input type="date" name="dob" value={formData.dob || ''} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Unique ID (Aadhar, Passport, etc.):
            <input type="text" name="uniqueId" value={formData.uniqueId || ''} onChange={handleInputChange} />
          </label>
          <br />
          <button onClick={handleRegister}>Register</button>
        </div>
      );
    }
  };

  if (view === 'login') {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Hospital & Appointment Management System</h1>
        <h2>Select Role to Register</h2>
        <button onClick={() => handleRoleSelect(roles.HOSPITAL_ADMIN)}>Hospital Admin</button>{' '}
        <button onClick={() => handleRoleSelect(roles.DOCTOR)}>Doctor</button>{' '}
        <button onClick={() => handleRoleSelect(roles.PATIENT)}>Patient</button>
      </div>
    );
  } else if (view === 'register') {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Hospital & Appointment Management System</h1>
        {renderRegistrationForm()}
        {message && <p style={{ color: 'red' }}>{message}</p>}
        <button onClick={() => setView('login')}>Back to Role Selection</button>
      </div>
    );
  } else if (view === 'dashboard') {
    // Hospital Admin Dashboard
    if (currentRole === roles.HOSPITAL_ADMIN) {
      const hospital = data.hospitals.find(h => h.id === currentUser.hospitalId);
      const hospitalDoctors = data.doctors.filter(d =>
        d.hospitalAssociations.some(assoc => assoc.hospitalId === hospital?.id)
      );

      // Calculate total consultations and revenue
      const hospitalAppointments = data.appointments.filter(app => app.hospitalId === hospital?.id);
      const totalConsultations = hospitalAppointments.length;
      const totalRevenue = hospitalAppointments.reduce((sum, app) => sum + app.fee, 0);

      // Revenue per doctor
      const revenuePerDoctor = {};
      hospitalDoctors.forEach(doc => {
        const docAppointments = hospitalAppointments.filter(app => app.doctorId === doc.id);
        const docRevenue = docAppointments.reduce((sum, app) => sum + app.fee, 0);
        revenuePerDoctor[doc.id] = docRevenue;
      });

      // Revenue per department
      const revenuePerDepartment = {};
      hospital.departments.forEach(dept => {
        const deptDoctors = hospitalDoctors.filter(doc => doc.specializations.includes(dept));
        let deptRevenue = 0;
        deptDoctors.forEach(doc => {
          const docAppointments = hospitalAppointments.filter(app => app.doctorId === doc.id);
          deptRevenue += docAppointments.reduce((sum, app) => sum + app.fee, 0);
        });
        revenuePerDepartment[dept] = deptRevenue;
      });

      // Department management
      const [newDepartment, setNewDepartment] = React.useState('');
      const addDepartment = () => {
        if (newDepartment.trim() === '') return;
        if (hospital.departments.includes(newDepartment.trim())) return;
        const updatedHospital = { ...hospital, departments: [...hospital.departments, newDepartment.trim()] };
        setData(prev => ({
          ...prev,
          hospitals: prev.hospitals.map(h => (h.id === hospital.id ? updatedHospital : h)),
        }));
        setNewDepartment('');
      };

      return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h1>Hospital Admin Dashboard</h1>
          <h2>Hospital: {hospital?.name}</h2>
          <h3>Location: {hospital?.location}</h3>

          <div>
            <h3>Departments</h3>
            <ul>
              {hospital?.departments.map((dept, idx) => (
                <li key={idx}>{dept}</li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="New Department"
              value={newDepartment}
              onChange={e => setNewDepartment(e.target.value)}
            />
            <button onClick={addDepartment}>Add Department</button>
          </div>

          <div>
            <h3>Doctors Associated</h3>
            <ul>
              {hospitalDoctors.map(doc => (
                <li key={doc.id}>{doc.name} - Specializations: {doc.specializations.join(', ')}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Consultations & Revenue</h3>
            <p>Total Consultations: {totalConsultations}</p>
            <p>Total Revenue: ₹{totalRevenue.toFixed(2)}</p>
            <h4>Revenue per Doctor</h4>
            <ul>
              {hospitalDoctors.map(doc => (
                <li key={doc.id}>
                  {doc.name}: ₹{(revenuePerDoctor[doc.id] || 0).toFixed(2)}
                </li>
              ))}
            </ul>
            <h4>Revenue per Department</h4>
            <ul>
              {hospital.departments.map((dept, idx) => (
                <li key={idx}>
                  {dept}: ₹{(revenuePerDepartment[dept] || 0).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>

          <button onClick={() => { setCurrentUser(null); setCurrentRole(null); setView('login'); }}>Logout</button>
        </div>
      );
    }

    if (currentRole === roles.DOCTOR) {
      // Doctor Dashboard
      const doctor = data.doctors.find(d => d.id === currentUser.id);

      // Hospitals that have departments matching doctor's specializations
      const matchingHospitals = data.hospitals.filter(h =>
        h.departments.some(dept => doctor.specializations.includes(dept))
      );

      // Doctor's hospital associations with fees and availability
      const [selectedHospitalId, setSelectedHospitalId] = React.useState(
        doctor.hospitalAssociations.length > 0 ? doctor.hospitalAssociations[0].hospitalId : ''
      );
      const [consultationFee, setConsultationFee] = React.useState('');
      const [availabilityDate, setAvailabilityDate] = React.useState('');
      const [availabilityTime, setAvailabilityTime] = React.useState('');
      const [message, setMessage] = React.useState('');

      // Add or update hospital association
      const addOrUpdateAssociation = () => {
        if (!selectedHospitalId) {
          setMessage('Select a hospital.');
          return;
        }
        if (!consultationFee || isNaN(parseFloat(consultationFee))) {
          setMessage('Enter a valid consultation fee.');
          return;
        }
        const fee = parseFloat(consultationFee);
        let associations = [...doctor.hospitalAssociations];
        const index = associations.findIndex(a => a.hospitalId === selectedHospitalId);
        if (index >= 0) {
          associations[index].consultationFee = fee;
        } else {
          associations.push({ hospitalId: selectedHospitalId, consultationFee: fee, availability: [] });
        }
        const updatedDoctor = { ...doctor, hospitalAssociations: associations };
        setData(prev => ({
          ...prev,
          doctors: prev.doctors.map(d => (d.id === doctor.id ? updatedDoctor : d)),
        }));
        setMessage('Consultation fee updated.');
      };

      // Add availability time slot with conflict check
      const addAvailability = () => {
        if (!selectedHospitalId) {
          setMessage('Select a hospital.');
          return;
        }
        if (!availabilityDate || !availabilityTime) {
          setMessage('Select date and time.');
          return;
        }
        const associations = [...doctor.hospitalAssociations];
        const assocIndex = associations.findIndex(a => a.hospitalId === selectedHospitalId);
        if (assocIndex < 0) {
          setMessage('Please set consultation fee first.');
          return;
        }
        const newSlot = availabilityDate + ' ' + availabilityTime;

        // Check for conflicts across all hospitals
        for (const assoc of associations) {
          if (assoc.availability.includes(newSlot)) {
            setMessage('Time slot conflicts with existing availability.');
            return;
          }
        }

        associations[assocIndex].availability.push(newSlot);
        const updatedDoctor = { ...doctor, hospitalAssociations: associations };
        setData(prev => ({
          ...prev,
          doctors: prev.doctors.map(d => (d.id === doctor.id ? updatedDoctor : d)),
        }));
        setMessage('Availability added.');
        setAvailabilityDate('');
        setAvailabilityTime('');
      };

      // Calculate earnings and consultations
      const doctorAppointments = data.appointments.filter(app => app.doctorId === doctor.id);
      const totalConsultations = doctorAppointments.length;
      const totalEarnings = doctorAppointments.reduce((sum, app) => sum + app.fee * 0.6, 0);

      // Earnings per hospital
      const earningsPerHospital = {};
      doctor.hospitalAssociations.forEach(assoc => {
        const apps = doctorAppointments.filter(app => app.hospitalId === assoc.hospitalId);
        const earning = apps.reduce((sum, app) => sum + app.fee * 0.6, 0);
        earningsPerHospital[assoc.hospitalId] = earning;
      });

      return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h1>Doctor Dashboard</h1>
          <h2>{doctor.name}</h2>
          <p>Qualifications: {doctor.qualifications}</p>
          <p>Specializations: {doctor.specializations.join(', ')}</p>
          <p>Experience: {doctor.experience} years</p>

          <div>
            <h3>Associate with Hospital</h3>
            <select value={selectedHospitalId} onChange={e => setSelectedHospitalId(e.target.value)}>
              <option value="">Select Hospital</option>
              {matchingHospitals.map(h => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
            <br />
            <label>
              Consultation Fee:
              <input
                type="number"
                value={consultationFee}
                onChange={e => setConsultationFee(e.target.value)}
              />
            </label>
            <button onClick={addOrUpdateAssociation}>Set Fee</button>
          </div>

          <div>
            <h3>Manage Availability</h3>
            <label>
              Date:
              <input
                type="date"
                value={availabilityDate}
                onChange={e => setAvailabilityDate(e.target.value)}
              />
            </label>
            <br />
            <label>
              Time:
              <input
                type="time"
                value={availabilityTime}
                onChange={e => setAvailabilityTime(e.target.value)}
              />
            </label>
            <br />
            <button onClick={addAvailability}>Add Availability</button>
          </div>

          <div>
            <h3>Current Availability</h3>
            <ul>
              {doctor.hospitalAssociations
                .filter(assoc => assoc.hospitalId === selectedHospitalId)
                .flatMap(assoc => assoc.availability)
                .map((slot, idx) => (
                  <li key={idx}>{slot}</li>
                ))}
            </ul>
          </div>

          <div>
            <h3>Consultations & Earnings</h3>
            <p>Total Consultations: {totalConsultations}</p>
            <p>Total Earnings: ₹{totalEarnings.toFixed(2)}</p>
            <h4>Earnings per Hospital</h4>
            <ul>
              {doctor.hospitalAssociations.map(assoc => {
                const hospital = data.hospitals.find(h => h.id === assoc.hospitalId);
                return (
                  <li key={assoc.hospitalId}>
                    {hospital?.name}: ₹{(earningsPerHospital[assoc.hospitalId] || 0).toFixed(2)}
                  </li>
                );
              })}
            </ul>
          </div>

          {message && <p style={{ color: 'red' }}>{message}</p>}

          <button onClick={() => { setCurrentUser(null); setCurrentRole(null); setView('login'); }}>Logout</button>
        </div>
      );
    }

    if (currentRole === roles.PATIENT) {
      const patient = data.patients.find(p => p.id === currentUser.id);

      // Filters for doctor search
      const [filterHospitalId, setFilterHospitalId] = React.useState('');
      const [filterSpecialization, setFilterSpecialization] = React.useState('');
      const [filterAvailabilityDate, setFilterAvailabilityDate] = React.useState('');

      // Filtered doctors based on filters
      const filteredDoctors = data.doctors.filter(doc => {
        // Filter by specialization
        if (filterSpecialization && !doc.specializations.includes(filterSpecialization)) return false;

        // Filter by hospital
        if (filterHospitalId) {
          const assoc = doc.hospitalAssociations.find(a => a.hospitalId === filterHospitalId);
          if (!assoc) return false;

          // Filter by availability date
          if (filterAvailabilityDate) {
            const hasAvailability = assoc.availability.some(slot => slot.startsWith(filterAvailabilityDate));
            if (!hasAvailability) return false;
          }
        }
        return true;
      });

      // Booking state
      const [selectedDoctorId, setSelectedDoctorId] = React.useState('');
      const [selectedHospitalId, setSelectedHospitalId] = React.useState('');
      const [selectedTimeSlot, setSelectedTimeSlot] = React.useState('');
      const [consultationFeeInput, setConsultationFeeInput] = React.useState('');
      const [message, setMessage] = React.useState('');

      // Book appointment
      const bookAppointment = () => {
        if (!selectedDoctorId || !selectedHospitalId || !selectedTimeSlot) {
          setMessage('Please select doctor, hospital, and time slot.');
          return;
        }
        if (!consultationFeeInput || isNaN(parseFloat(consultationFeeInput))) {
          setMessage('Please enter a valid consultation fee.');
          return;
        }
        const fee = parseFloat(consultationFeeInput);

        // Check if time slot is still available
        const doctor = data.doctors.find(d => d.id === selectedDoctorId);
        const assocIndex = doctor.hospitalAssociations.findIndex(a => a.hospitalId === selectedHospitalId);
        if (assocIndex < 0) {
          setMessage('Doctor is not associated with selected hospital.');
          return;
        }
        const assoc = doctor.hospitalAssociations[assocIndex];
        if (!assoc.availability.includes(selectedTimeSlot)) {
          setMessage('Selected time slot is no longer available.');
          return;
        }

        // Remove time slot from availability
        const updatedAvailability = assoc.availability.filter(slot => slot !== selectedTimeSlot);
        const updatedAssociations = [...doctor.hospitalAssociations];
        updatedAssociations[assocIndex] = { ...assoc, availability: updatedAvailability };
        const updatedDoctor = { ...doctor, hospitalAssociations: updatedAssociations };

        // Create appointment
        const newAppointment = {
          id: generateId(),
          patientId: patient.id,
          doctorId: selectedDoctorId,
          hospitalId: selectedHospitalId,
          timeSlot: selectedTimeSlot,
          fee,
        };

        setData(prev => ({
          ...prev,
          doctors: prev.doctors.map(d => (d.id === doctor.id ? updatedDoctor : d)),
          appointments: [...prev.appointments, newAppointment],
        }));

        setMessage('Appointment booked successfully.');
        setSelectedDoctorId('');
        setSelectedHospitalId('');
        setSelectedTimeSlot('');
        setConsultationFeeInput('');
      };

      // Patient consultation history
      const patientAppointments = data.appointments.filter(app => app.patientId === patient.id);

      return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h1>Patient Dashboard</h1>
          <h2>{patient.name}</h2>

          <div>
            <h3>Search Doctors</h3>
            <label>
              Hospital:
              <select value={filterHospitalId} onChange={e => setFilterHospitalId(e.target.value)}>
                <option value="">All</option>
                {data.hospitals.map(h => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Specialization:
              <input
                type="text"
                placeholder="Enter specialization"
                value={filterSpecialization}
                onChange={e => setFilterSpecialization(e.target.value)}
              />
            </label>
            <br />
            <label>
              Availability Date:
              <input
                type="date"
                value={filterAvailabilityDate}
                onChange={e => setFilterAvailabilityDate(e.target.value)}
              />
            </label>
          </div>

          <div>
            <h3>Available Doctors</h3>
            <ul>
              {filteredDoctors.map(doc => (
                <li key={doc.id}>
                  {doc.name} - Specializations: {doc.specializations.join(', ')}
                  <br />
                  Hospitals:
                  <ul>
                    {doc.hospitalAssociations
                      .filter(assoc => !filterHospitalId || assoc.hospitalId === filterHospitalId)
                      .map(assoc => {
                        const hospital = data.hospitals.find(h => h.id === assoc.hospitalId);
                        // Filter availability by date if set
                        const availableSlots = filterAvailabilityDate
                          ? assoc.availability.filter(slot => slot.startsWith(filterAvailabilityDate))
                          : assoc.availability;
                        return (
                          <li key={assoc.hospitalId}>
                            {hospital?.name} - Fee: ₹{assoc.consultationFee.toFixed(2)}
                            <br />
                            Available Slots:
                            <ul>
                              {availableSlots.map((slot, idx) => (
                                <li key={idx}>
                                  <button
                                    onClick={() => {
                                      setSelectedDoctorId(doc.id);
                                      setSelectedHospitalId(assoc.hospitalId);
                                      setSelectedTimeSlot(slot);
                                      setConsultationFeeInput(assoc.consultationFee.toString());
                                      setMessage('');
                                    }}
                                  >
                                    {slot}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </li>
                        );
                      })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Book Appointment</h3>
            <p>
              Selected Doctor ID: {selectedDoctorId || 'None'} <br />
              Selected Hospital ID: {selectedHospitalId || 'None'} <br />
              Selected Time Slot: {selectedTimeSlot || 'None'}
            </p>
            <label>
              Consultation Fee:
              <input
                type="number"
                value={consultationFeeInput}
                onChange={e => setConsultationFeeInput(e.target.value)}
              />
            </label>
            <br />
            <button onClick={bookAppointment}>Book</button>
          </div>

          {message && <p style={{ color: 'red' }}>{message}</p>}

          <div>
            <h3>Consultation History</h3>
            <ul>
              {patientAppointments.map(app => {
                const doctor = data.doctors.find(d => d.id === app.doctorId);
                const hospital = data.hospitals.find(h => h.id === app.hospitalId);
                return (
                  <li key={app.id}>
                    Doctor: {doctor?.name} | Hospital: {hospital?.name} | Time: {app.timeSlot} | Fee Paid: ₹{app.fee.toFixed(2)}
                  </li>
                );
              })}
            </ul>
          </div>

          <button onClick={() => { setCurrentUser(null); setCurrentRole(null); setView('login'); }}>Logout</button>
        </div>
      );
    }

    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Welcome, {currentUser?.name || currentRole}</h1>
        <p>Dashboard will be implemented here.</p>
        <button onClick={() => { setCurrentUser(null); setCurrentRole(null); setView('login'); }}>Logout</button>
      </div>
    );
  }
}

export default HospitalAppointmentSystem;
