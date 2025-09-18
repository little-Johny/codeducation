import React, { useState } from 'react';
import { useGet, useApi } from '../../hooks/useQuery';
import CourseCard from '../../components/CourseCard';

export default function CoursesManagement() {
  const { data: courses, loading, reload } = useGet('/courses');
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalUploadOpen, setModalUploadOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', category: '' });
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileCreate, setSelectedFileCreate] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    let body = formData;
    if (selectedFileCreate) {
      body = new FormData();
      body.append('title', formData.title);
      body.append('description', formData.description);
      body.append('category', formData.category);
      body.append('image', selectedFileCreate);

      console.log('[DEBUG] Creating course with file:', {
        title: formData.title,
        fileName: selectedFileCreate.name,
        fileSize: selectedFileCreate.size,
        fileType: selectedFileCreate.type
      });
    } else {
      console.log('[DEBUG] Creating course without file:', formData);
    }

    const result = await useApi('post', '/courses', body, true);
    console.log('[DEBUG] Create course result:', result);

    setSubmitting(false);
    if (result?.success) {
      setModalCreateOpen(false);
      setFormData({ title: '', description: '', category: '' });
      setSelectedFileCreate(null);
      reload();
    }
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (!selectedCourse || !selectedFile) return;
    setSubmitting(true);
    const formDataUpload = new FormData();
    formDataUpload.append('image', selectedFile);

    console.log('[DEBUG] Uploading image to course:', {
      courseId: selectedCourse,
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      fileType: selectedFile.type
    });

    const result = await useApi('post', `/courses/${selectedCourse}/files`, formDataUpload, true);
    console.log('[DEBUG] Upload image result:', result);

    setSubmitting(false);
    if (result?.success) {
      setModalUploadOpen(false);
      setSelectedCourse('');
      setSelectedFile(null);
      reload();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cursos Disponibles</h1>
      <div className="mb-4 flex gap-4">
        <button className="btn btn-primary" onClick={() => setModalCreateOpen(true)}>
          Crear Nuevo Curso
        </button>
        <button className="btn btn-secondary" onClick={() => setModalUploadOpen(true)}>
          Subir Imagen de Portada
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {courses?.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Modal Crear Curso */}
      <dialog open={modalCreateOpen} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Crear Nuevo Curso</h3>
          <form onSubmit={handleCreateCourse}>
            <div className="py-4">
              <label className="block mb-2">Título</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <label className="block mb-2 mt-4">Descripción</label>
              <textarea
                className="textarea textarea-bordered w-full"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <label className="block mb-2 mt-4">Categoría</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
              <label className="block mb-2 mt-4">Imagen de Portada (opcional)</label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/*"
                onChange={(e) => setSelectedFileCreate(e.target.files[0])}
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={() => setModalCreateOpen(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? <span className="loading loading-spinner loading-sm"></span> : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Modal Subir Imagen */}
      <dialog open={modalUploadOpen} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Subir Imagen de Portada</h3>
          <form onSubmit={handleUploadImage}>
            <div className="py-4">
              <label className="block mb-2">Seleccionar Curso</label>
              <select
                className="select select-bordered w-full"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                required
              >
                <option value="">Selecciona un curso</option>
                {courses?.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
              <label className="block mb-2 mt-4">Seleccionar Imagen</label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                required
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={() => setModalUploadOpen(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting || !selectedCourse || !selectedFile}>
                {submitting ? <span className="loading loading-spinner loading-sm"></span> : 'Subir'}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}