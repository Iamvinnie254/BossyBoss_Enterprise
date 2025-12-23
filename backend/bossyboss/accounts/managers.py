from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, phone, full_name, password=None):
        if not email:
            raise ValueError("Email is required")

        user = self.model(
            email=self.normalize_email(email),
            phone=phone,
            full_name=full_name
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, phone, full_name, password):
        user = self.create_user(email, phone, full_name, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
