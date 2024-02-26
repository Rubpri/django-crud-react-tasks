from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializer import TaskSerializer
from .models import Task

# Create your views here.

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    def create(self, request, *args, **kwargs):
        if Task.objects.count() >= 20:
            return Response({"detail": "No se pueden almacenar más de 20 tareas."}, status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)

    