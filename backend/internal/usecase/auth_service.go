package usecase

import (
	"context"
	"errors"
	"backend/internal/dto"
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/utils"

	"golang.org/x/crypto/bcrypt"
	"google.golang.org/api/idtoken"
)

type AuthUsecase interface {
	Register(req *dto.RegisterUserRequest) (*dto.AuthResponse, error)
	Login(req *dto.LoginUserRequest) (*dto.AuthResponse, error)
	GoogleLogin(req *dto.GoogleLoginRequest) (*dto.AuthResponse, error)
}

type authUsecase struct {
	userRepo repository.UserRepository
}

func NewAuthUsecase(userRepo repository.UserRepository) AuthUsecase {
	return &authUsecase{userRepo}
}

func (u *authUsecase) Register(req *dto.RegisterUserRequest) (*dto.AuthResponse, error) {
	// Check if user already exists
	_, err := u.userRepo.FindByEmail(req.Email)
	if err == nil {
		return nil, errors.New("email already registered")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	newUser := &entity.User{
		Email:     req.Email,
		Password:  string(hashedPassword),
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Role:      entity.UserRole,
		IsActive:  true,
	}

	if err := u.userRepo.Create(newUser); err != nil {
		return nil, err
	}

	token, err := utils.GenerateToken(newUser.ID, string(newUser.Role))
	if err != nil {
		return nil, err
	}

	return &dto.AuthResponse{
		Token: token,
		User: &dto.UserResponse{
			ID:        newUser.ID,
			Email:     newUser.Email,
			FirstName: newUser.FirstName,
			LastName:  newUser.LastName,
			Role:      string(newUser.Role),
			IsActive:  newUser.IsActive,
		},
	}, nil
}

func (u *authUsecase) Login(req *dto.LoginUserRequest) (*dto.AuthResponse, error) {
	user, err := u.userRepo.FindByEmail(req.Email)
	if err != nil {
		return nil, errors.New("invalid email or password")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		return nil, errors.New("invalid email or password")
	}

	token, err := utils.GenerateToken(user.ID, string(user.Role))
	if err != nil {
		return nil, err
	}

	return &dto.AuthResponse{
		Token: token,
		User: &dto.UserResponse{
			ID:        user.ID,
			Email:     user.Email,
			FirstName: user.FirstName,
			LastName:  user.LastName,
			Role:      string(user.Role),
			IsActive:  user.IsActive,
		},
	}, nil
}

func (u *authUsecase) GoogleLogin(req *dto.GoogleLoginRequest) (*dto.AuthResponse, error) {
	// Validate Google Token
	payload, err := idtoken.Validate(context.Background(), req.Token, "")
	if err != nil {
		return nil, errors.New("invalid google token")
	}

	email := payload.Claims["email"].(string)

	user, err := u.userRepo.FindByEmail(email)
	if err != nil {
		// User not found, create new user
		// Note: Google payload might have given_name and family_name
		firstName, _ := payload.Claims["given_name"].(string)
		lastName, _ := payload.Claims["family_name"].(string)

		newUser := &entity.User{
			Email:     email,
			Password:  "", // No password for Google users
			FirstName: firstName,
			LastName:  lastName,
			Role:      entity.UserRole,
			IsActive:  true,
		}

		if err := u.userRepo.Create(newUser); err != nil {
			return nil, err
		}
		user = newUser
	}

	token, err := utils.GenerateToken(user.ID, string(user.Role))
	if err != nil {
		return nil, err
	}

	return &dto.AuthResponse{
		Token: token,
		User: &dto.UserResponse{
			ID:        user.ID,
			Email:     user.Email,
			FirstName: user.FirstName,
			LastName:  user.LastName,
			Role:      string(user.Role),
			IsActive:  user.IsActive,
		},
	}, nil
}
