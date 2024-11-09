import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold">Terms and Conditions</h1>
        </div>

        <div className="space-y-6 text-gray-300">
          <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-yellow-500 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
            <p className="text-sm">
              By using this service, you agree to these terms and conditions. These terms are binding and cannot be revoked once accepted.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-3">1. Service Usage</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>The service is provided "as is" without any warranties.</li>
              <li>Users are responsible for the content they submit and view.</li>
              <li>Abuse of the service may result in immediate termination.</li>
              <li>We reserve the right to modify or discontinue the service at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Account Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Users must maintain accurate account information.</li>
              <li>Sharing accounts is strictly prohibited.</li>
              <li>Users are responsible for maintaining account security.</li>
              <li>Free trial is limited to 100 views per account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Payment and Refunds</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All purchases are final and non-refundable.</li>
              <li>Subscription fees are charged in advance.</li>
              <li>Price changes will be notified in advance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Prohibited Activities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Attempting to bypass system limitations or restrictions.</li>
              <li>Using the service for illegal purposes.</li>
              <li>Interfering with the service's operation.</li>
              <li>Attempting to reverse engineer the service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
            <p>
              We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
            </p>
          </section>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              By using our service, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. These terms are effective as of January 1, 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;