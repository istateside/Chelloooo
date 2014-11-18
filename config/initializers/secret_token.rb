# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
Chellooo::Application.config.secret_key_base = ENV['SECRET_KEY_BASE'] || 'c2948a923df90349b8be37ec8b9349000ef29152b7215b0c7c98376e714e217e1d8cc00260b2c2ce38ee4d54d9b3772b83f4d87c9dc39a8f05aa8c62d3be65b0'
