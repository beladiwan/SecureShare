from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user

class IsPartner(permissions.BasePermission):
    def has_permission(self, request, view):
        return hasattr(request.user, 'partner') and request.user.partner.is_active