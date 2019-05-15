package vn.tdmu.innovationlab;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.method.ScrollingMovementMethod;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;


import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;

import org.w3c.dom.Text;

import vn.tdmu.innovationlab.Module.GlideApp;
import vn.tdmu.innovationlab.Module.MyAppGlideModule;
import vn.tdmu.innovationlab.model.QRContentModel;

public class QRContentActivity extends AppCompatActivity {

    private Intent intent;
    private DatabaseReference qrDataRef;
    private StorageReference qrStorageRef;
    private TextView txtContext;
    private TextView txtIdQR;
    private TextView txtNameQR;
    private TextView txtCategory;
    private ImageView img;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_qrcontent);
        addControls();
        addMethods();
    }

    private void addControls() {
        intent = getIntent();
        qrDataRef = FirebaseDatabase.getInstance().getReference("qrdata").child(intent.getStringExtra("idqr"));
        txtContext = findViewById(R.id.textViewContext);
        txtIdQR = findViewById(R.id.textViewIdQR);
        txtNameQR = findViewById(R.id.textViewNameQR);
        txtCategory = findViewById(R.id.textViewCategory);
        img = findViewById(R.id.ImageView);
        txtIdQR.setText("");
        txtNameQR.setText("");
        txtCategory.setText("");
        txtContext.setText("");
        txtContext.setMovementMethod(new ScrollingMovementMethod());
        qrStorageRef = FirebaseStorage.getInstance().getReference("images").child(intent.getStringExtra("idqr"));
    }

    private void addMethods() {
        qrDataRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                QRContentModel content = dataSnapshot.getValue(QRContentModel.class);
                if (content != null) {
                    txtContext.setText("Nội dung:\t" + content.context);
                    txtIdQR.setText("Id:\t" + content.idqr);
                    txtNameQR.setText("Tên:\t" + content.nameqr);
                    txtCategory.setText("Loại:\t" + content.sel1);
                    if (content.sel1.equals(getString(R.string.QR_content_option_image))) {
                        if (qrStorageRef == null) {
                            Toast.makeText(QRContentActivity.this, "Chưa có hình!", Toast.LENGTH_SHORT).show();
                        }
                        GlideApp.with(QRContentActivity.this)
                                .load(qrStorageRef)
                                .into(img);
                    }
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {
                // Failed to read value
                Log.w("QRContentAcitivity", "Failed to read value.", databaseError.toException());
            }
        });
    }
}
