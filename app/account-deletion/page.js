export default function AccountDeletion() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Account Deletion Instructions</h1>
      <div className="prose">
        <p>To delete your account and all associated data:</p>
        <ol>
          <li>Log into your account</li>
          <li>Go to Account Settings</li>
          <li>Click on "Delete Account"</li>
          <li>Confirm deletion</li>
        </ol>
        <p>Alternatively, you can email us at: support@your-domain.com</p>
        <p>
          Note: Account deletion is permanent and cannot be undone. All your
          personal data will be removed from our systems.
        </p>
      </div>
    </div>
  );
}
