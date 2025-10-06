export const COURSE_CATEGORIES = [
    { id: "web", name: "Desarrollo Web", color: "#3B82F6" }, // azul
    { id: "programming", name: "Programación y Software", color: "#6366F1" }, // índigo
    { id: "db", name: "Bases de Datos", color: "#14B8A6" }, // teal
    { id: "ai", name: "Inteligencia Artificial", color: "#F59E0B" }, // ámbar
    { id: "data", name: "Ciencia de Datos", color: "#10B981" }, // verde
    { id: "security", name: "Ciberseguridad", color: "#EF4444" }, // rojo
    { id: "ux", name: "Diseño UX/UI", color: "#EC4899" }, // rosa
    { id: "marketing", name: "Marketing Digital", color: "#8B5CF6" }, // violeta
    { id: "business", name: "Negocios y Emprendimiento", color: "#F97316" }, // naranja
    { id: "finance", name: "Finanzas y Contabilidad", color: "#0EA5E9" }, // celeste
    { id: "languages", name: "Idiomas", color: "#22C55E" }, // verde brillante
    { id: "art", name: "Arte y Diseño", color: "#D946EF" }, // fucsia
    { id: "music", name: "Música y Producción", color: "#A855F7" }, // púrpura
    { id: "photo", name: "Fotografía y Video", color: "#F43F5E" }, // rosado fuerte
    { id: "health", name: "Salud y Bienestar", color: "#84CC16" }, // lima
    { id: "skills", name: "Productividad y Habilidades Blandas", color: "#64748B" }, // gris
];

export const getCategory = (categoryId) => {
    return COURSE_CATEGORIES.find((c) => c.id === categoryId) || null;
};
