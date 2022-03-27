# kanvally-front

### Por hacer:
1. Project page (editar)
2. Team page (editar, cambiar estado de tareas(React DnD))
3. Task modal (editar, cambiar estado, eliminar comentario, subir archivo)
4. User view (username, email, proyectos que compartimos)
5. Mostrar las invitaciones pendientes en el perfil

### Hecho:
1. Home page
2. Login page
3. Signup page
4. Dashboard page (crear proyecto, abrir proyecto)
5. Project page (ver miembros, invitar, crear equipo, ver equipos)
6. Team page (crear tarea, ver tareas, abrir tarea, añadir miembro, eliminar miembro, cambiar rol miembro)
7. Task modal (eliminar tarea, crear comentario)
8. Pasar a componente el modal con un Children

### Paleta random elegida:
- Ebony-clay
- White
- Crimson
- Bali

### Ejemplo de cosas a tener en cuenta que podrían mejorar el rendimiento (*A.K.A. no me retes zul porque aprendo sobre la marcha*):
- Si hago el cambio de rol de un usuario, el servicio de la api debería devolver solo la nueva lista de usuarios, y el fulfilled cambiar eso en el estado. Asi  evitaría refrescar la página para volver a cargar todo.
- Aplica para todo lo que haga un update específico.