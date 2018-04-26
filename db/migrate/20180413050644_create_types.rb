class CreateTypes < ActiveRecord::Migration[5.1]
  def change
    enable_extension 'uuid-ossp'
    enable_extension 'pgcrypto'
    create_table :types, id: :uuid do |t|
      t.uuid :name, index: true
      t.uuid :description

      t.timestamps
    end
  end
end
