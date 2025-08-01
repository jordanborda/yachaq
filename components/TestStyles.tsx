export function TestStyles() {
  return (
    <div className="p-4 bg-blue-500 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2">¡Estilos funcionando!</h2>
      <p className="text-blue-100">
        Si puedes ver este componente con colores azules, gradientes y bordes redondeados, 
        entonces Tailwind CSS está funcionando correctamente.
      </p>
      <button className="mt-3 bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition-colors">
        Botón de prueba
      </button>
    </div>
  )
}