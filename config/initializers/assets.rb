# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('fonts')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
Rails.application.config.assets.precompile += %w( admin.js admin.css comic.js  tinymce-jquery.js application.css application.js)

Rails.application.config.assets.precompile += %w( *.js ^[^_]*.css *.css.erb *.svg *.eot *.ttf *.woff )
# Rails.application.config.assets.precompile += %w( .svg .eot .woff .ttf)
