import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    addresses: [],
  });
  const [editForm, setEditForm] = useState({ ...form });
  const [editIndex, setEditIndex] = useState(-1);
  const [addressForm, setAddressForm] = useState({
    name: '',
    address: '',
    contact: '',
    type: 'Delivery',
  });
  // Auth check and fetch profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userData) => {
      if (!userData) {
        navigate("/login");
      } else {
        await userData.reload();
        if (!userData.emailVerified) {
          alert("Please verify your email first.");
          navigate("/login");
        } else {
          setUser(userData);
          const ref = doc(db, "users", userData.uid);
          const snapshot = await getDoc(ref);
          if (snapshot.exists()) {
            setForm(snapshot.data());
            setEditForm(snapshot.data());
          } else {
            setForm({
              name: '',
              company: '',
              email: userData.email,
              phone: '',
              addresses: []
            }); setEditForm((prev) => ({ ...prev, email: userData.email }));
          }
          setLoading(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    setEditForm(form);
  }, [form]);
  const handleProfileUpdate = async () => {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...editForm,
        addresses: form.addresses || []
      }, { merge: true });
      setForm({ ...editForm, addresses: form.addresses });
      Swal.fire({
        title: "Good job!",
        text: "Profile updated!",
        icon: "success"
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error updating profile.",
      });
    }
  };
  const handleAddAddress = async () => {
    let updated = [];
    if (editIndex >= 0) {
      updated = [...form.addresses];
      updated[editIndex] = addressForm;
      setEditIndex(-1);
    } else {
      updated = [...form.addresses, addressForm];
    }
    setForm({ ...form, addresses: updated });
    await setDoc(doc(db, 'users', user.uid), {
      addresses: updated
    }, { merge: true });
    setAddressForm({
      name: '',
      address: '',
      contact: '',
      type: 'Delivery'
    });
  };
  const handleEditAddress = (index) => {
    setAddressForm({ ...form.addresses[index] });
    setEditIndex(index);
  };
  const handleDeleteAddress = async (index) => {
    const updated = [...form.addresses];
    updated.splice(index, 1);
    setForm({ ...form, addresses: updated });
    await setDoc(doc(db, 'users', user.uid), {
      addresses: updated
    }, { merge: true });
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Profile</h2>
      <div className="card mb-4 p-4 shadow-sm">
        <p><strong>Full Name:</strong> {form.name}</p>
        <p><strong>Company:</strong> {form.company}</p>
        <p><strong>Email:</strong> {form.email}</p>
        <p><strong>Phone:</strong> {form.phone}</p>
        <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal">
          Edit Profile
        </button>
      </div>
      <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={editForm.email} disabled />
              </div>
              <div className="mb-3">
                <label className="form-label">Company</label>
                <input type="text" className="form-control" value={editForm.company}
                  onChange={(e) => setEditForm({ ...editForm, company: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
              </div>
              <div className="text-end">
                <button
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  onClick={handleProfileUpdate}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h4 className="mb-3">Manage Addresses</h4>
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Name"
            value={addressForm.name}
            onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })} />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Full Address"
            value={addressForm.address}
            onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })} />
        </div>
        <div className="col-md-2">
          <input type="text" className="form-control" placeholder="Contact"
            value={addressForm.contact}
            onChange={(e) => setAddressForm({ ...addressForm, contact: e.target.value })} />
        </div>
        <div className="col-md-2">
          <select className="form-select" value={addressForm.type}
            onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value })}>
            <option value="Delivery">Delivery</option>
            <option value="Invoice">Invoice</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleAddAddress}>
            {editIndex >= 0 ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
      {form.addresses?.length > 0 && (
        <div className="row">
          {form.addresses.map((addr, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{addr.name} ({addr.type})</h5>
                  <p className="card-text">
                    📍 {addr.address}<br />
                    📞 {addr.contact}
                  </p>
                  <button className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditAddress(index)}>Edit</button>
                  <button className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteAddress(index)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}