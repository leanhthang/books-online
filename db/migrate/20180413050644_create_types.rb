class CreateTypes < ActiveRecord::Migration[5.1]
  def change
    enable_extension 'uuid-ossp'
    enable_extension 'pgcrypto'
    create_table :types, id: :uuid do |t|
      t.string :name, index: true
      t.string :description

      t.timestamps
    end
  end
end
