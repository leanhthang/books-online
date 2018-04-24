class CreateAuthors < ActiveRecord::Migration[5.1]
  def change
    enable_extension 'uuid-ossp'
    enable_extension 'pgcrypto'
    enable_extension 'citext'
    create_table :authors, id: :uuid do |t|
      t.citext :name
      t.citext :name_vn
      t.citext :description
      t.string :avatar

      t.timestamps
    end
  end
end
