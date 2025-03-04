"use client";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cv: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && !["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) {
      alert("Only PDF and DOCX files are allowed.");
      return;
    }
    setFormData((prev) => ({ ...prev, cv: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.cv) {
      alert("All fields are required!");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("email", formData.email);
    formDataObj.append("phone", formData.phone);
    formDataObj.append("cv", formData.cv);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formDataObj,
    });

    if (response.ok) {
      alert("CV uploaded successfully!");
    } else {
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4">
        <h2 className="text-xl font-bold ">Job Application Form</h2>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
}
